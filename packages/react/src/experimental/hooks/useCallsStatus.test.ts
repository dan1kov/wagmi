import { connect, disconnect } from '@wagmi/core'
import { accounts, config, testClient } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { useCallsStatus } from './useCallsStatus.js'
import { useSendCalls } from './useSendCalls.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useSendCalls())

  result.current.sendCalls({
    calls: [
      {
        data: '0xdeadbeef',
        to: accounts[1],
        value: parseEther('1'),
      },
      {
        to: accounts[2],
        value: parseEther('2'),
      },
      {
        to: accounts[3],
        value: parseEther('3'),
      },
    ],
  })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  const { result: result_2 } = renderHook(() =>
    useCallsStatus({ id: result.current.data! }),
  )
  await waitFor(() => expect(result_2.current.isSuccess).toBeTruthy())

  expect(result_2.current.data).toMatchInlineSnapshot(
    `
    {
      "receipts": [],
      "status": "PENDING",
    }
  `,
  )

  await testClient.mainnet.mine({ blocks: 1 })

  const { result: result_3 } = renderHook(() =>
    useCallsStatus({ id: result.current.data! }),
  )
  await waitFor(() => expect(result_3.current.isSuccess).toBeTruthy())

  expect(result_3.current.data?.status).toBe('CONFIRMED')
  expect(
    result_3.current.data?.receipts?.map((x) => ({
      ...x,
      blockHash: undefined,
    })),
  ).toMatchInlineSnapshot(
    `
    [
      {
        "blockHash": undefined,
        "blockNumber": 19258214n,
        "gasUsed": 21064n,
        "logs": [],
        "status": "success",
        "transactionHash": "0x13c53b2d4d9da424835525349cd66e553330f323d6fb19458b801ae1f7989a41",
      },
      {
        "blockHash": undefined,
        "blockNumber": 19258214n,
        "gasUsed": 21000n,
        "logs": [],
        "status": "success",
        "transactionHash": "0xd8397b3e82b061c26a0c2093f1ceca0c3662a512614f7d6370349e89d0eea007",
      },
      {
        "blockHash": undefined,
        "blockNumber": 19258214n,
        "gasUsed": 21000n,
        "logs": [],
        "status": "success",
        "transactionHash": "0x4d26e346593d9ea265bb164b115e89aa92df43b0b8778ac75d4ad28e2a22b101",
      },
    ]
  `,
  )

  await disconnect(config, { connector })
})
