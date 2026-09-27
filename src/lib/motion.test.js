import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeScrollVelocity } from './motion.js'

test('normalizes signed velocity and clamps extreme scroll speed', () => {
  assert.equal(normalizeScrollVelocity(0), 0)
  assert.equal(normalizeScrollVelocity(900), 0.5)
  assert.equal(normalizeScrollVelocity(-900), -0.5)
  assert.equal(normalizeScrollVelocity(1800), 1)
  assert.equal(normalizeScrollVelocity(-1800), -1)
  assert.equal(normalizeScrollVelocity(3600), 1)
  assert.equal(normalizeScrollVelocity(-3600), -1)
})
