import { useSearchQuery } from "@/src/hooks/github-api";
import { renderHook, waitFor } from "@testing-library/react";
import { test, expect, beforeAll, afterAll, afterEach } from "vitest";
import { wrapper } from "../__mocks__/hooks/query-client-wrapper";
import { createHandlerMock } from "../__mocks__/rest/create-handler";
import { server } from "../__mocks__/server";
import { URL as GITHUB_API_URL } from '@/src/hooks/github-api'
import { Commits } from "@/src/models/commits";
import 'whatwg-fetch'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('useSearchQuery', async () => {
  // FIXME: For some reason, a real request is generated on CI, so we specify a real repository.
  const owner = process.env.CI ? '9sako6' : 'JaneDoe'
  const repository = 'commit-stalker'
  const handlerMock = createHandlerMock({ url: `${GITHUB_API_URL}/repos/${owner}/${repository}/commits`, responseBody: [], responseStatus: 200 })
  server.use(handlerMock)

  const { result } = renderHook(() => useSearchQuery({ owner, repository }), { wrapper })

  await waitFor(() => expect(result.current.isSuccess).toBe(true))

  Commits.parse(result.current.data)
})




