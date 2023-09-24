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
const length = 40
const threshold = 0.6
function getEndPoint(b: Branch): Point {
  return { x: b.start.x + b.length * Math.cos(b.theta), y: b.start.y + b.length * Math.sin(b.theta) }
}
function drawBranch(b: Branch) {
  lineTo(b.start, getEndPoint(b))
}

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
function step(branch: Branch) {
  const end = getEndPoint(branch)
  drawBranch(branch)

  if (Math.random() < threshold) {
    const leftBranch: Branch = { start: end, length: branch.length, theta: branch.theta - deltaTheta }
    step(leftBranch)
  }
  if (Math.random() < threshold) {
    const rightBranch: Branch = { start: end, length: branch.length, theta: branch.theta + deltaTheta }
    step(rightBranch)
  }
}
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
