#!/usr/bin/env node

import fastifyStatic from '@fastify/static'
import Fastify from 'fastify'
import open from 'open'
import path from 'path'
import { fileURLToPath } from 'url'
import { routeApis } from './route-apis'

const fastify = Fastify()
fastify.register(fastifyStatic, {
  root: path.join(fileURLToPath(import.meta.url), '../../editor'),
  prefix: '/editor',
})
fastify.register(routeApis, { prefix: '/apis' })
fastify.listen({ port: 7392 }, (err, address) => {
  if (err) throw err
  const editorUrl = `${address}/editor/`
  console.log(`Editor address: ${editorUrl}`)
  open(editorUrl)
})
