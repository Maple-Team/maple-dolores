<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement>()

const WIDTH = 600
const HEIGHT = 600
const ctxRef = ref<CanvasRenderingContext2D>()
interface Point {
  x: number
  y: number
}
interface Branch {
  start: Point
  theta: number
  length: number
}
const deltaTheta = 0.3
const length = 5
const threshold = 0.5
const minDepth = 4
function getEndPoint(b: Branch): Point {
  return { x: b.start.x + b.length * Math.cos(b.theta), y: b.start.y + b.length * Math.sin(b.theta) }
}
function drawBranch(b: Branch) {
  lineTo(b.start, getEndPoint(b))
}
/**
 * 使用任务队列的方式来实现广度优先
 */
const pendingTasks: Function[] = []
function lineTo(p1: Point, p2: Point) {
  ctxRef.value?.beginPath()
  ctxRef.value?.moveTo(p1.x, p1.y)
  ctxRef.value?.lineTo(p2.x, p2.y)
  ctxRef.value?.stroke()
}
const init = () => {
  ctxRef.value = canvasRef.value?.getContext('2d')!
  ctxRef.value.strokeStyle = '#fff'
  const branch: Branch = {
    start: { x: WIDTH / 2, y: HEIGHT },
    length,
    theta: -Math.PI / 2,
  }
  step(branch)
}
function step(branch: Branch, depth = 0) {
  const end = getEndPoint(branch)

  if (end.x < 0 || end.x > WIDTH) return
  if (end.y < 0 || end.y > HEIGHT) return
  drawBranch(branch)

  if (depth < minDepth || Math.random() < threshold) {
    const leftBranch: Branch = {
      start: end,
      length: branch.length + (Math.random() * 10 - 5),
      theta: branch.theta - deltaTheta * Math.random(),
    }
    pendingTasks.push(() => step(leftBranch, depth + 1))
  }
  if (depth < minDepth || Math.random() < threshold) {
    const rightBranch: Branch = {
      start: end,
      length: branch.length + (Math.random() * 10 - 5),
      theta: branch.theta + deltaTheta * Math.random(),
    }
    pendingTasks.push(() => step(rightBranch, depth + 1))
  }
}

function frame() {
  const clone = [...pendingTasks]
  pendingTasks.length = 0
  clone.forEach((fn) => fn())
}
let frameCount = 0
const startFrame = () => {
  requestAnimationFrame(() => {
    frameCount += 1
    if (frameCount % 10 === 0) frame()
    startFrame()
  })
}

startFrame()

onMounted(() => {
  init()
})
</script>

<template>
  <div>
    <canvas
      ref="canvasRef"
      width="600"
      height="600"
    ></canvas>
  </div>
</template>

<style>
div {
  background: #000;
}
canvas {
  border: 1px solid #fff;
}
</style>
