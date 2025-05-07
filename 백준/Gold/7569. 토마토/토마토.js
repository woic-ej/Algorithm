const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((item) => item.trim());

const [M, N, H] = input[0].split(" ").map(Number);

let queue = [];
let head = 0;
let rear = 0;

const dx = [-1, 1, 0, 0, 0, 0];
const dy = [0, 0, -1, 1, 0, 0];
const dz = [0, 0, 0, 0, -1, 1];

const rawData = input.splice(1);
let boxList = [];

for (let h = 0; h < H; h++) {
  const floor = [];
  for (let n = 0; n < N; n++) {
    const line = rawData[h * N + n].split(" ").map(Number);
    floor.push(line);
  }
  boxList.push(floor);
}

let visited = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => new Array(M).fill(false))
);

for (let z = 0; z < H; z++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (boxList[z][i][j] === 1) {
        queue.push([i, j, z, 0]);
        visited[z][i][j] = true;
        rear++;
      }
    }
  }
}

let result = 0;

while (head < rear) {
  const [currentX, currentY, currentZ, day] = queue[head++];
  result = Math.max(result, day);

  for (let i = 0; i < 6; i++) {
    const nx = currentX + dx[i];
    const ny = currentY + dy[i];
    const nz = currentZ + dz[i];

    if (
      nx >= 0 &&
      nx < N &&
      ny >= 0 &&
      ny < M &&
      nz >= 0 &&
      nz < H &&
      boxList[nz][nx][ny] === 0 &&
      !visited[nz][nx][ny]
    ) {
      boxList[nz][nx][ny] = 1;
      visited[nz][nx][ny] = true;
      queue.push([nx, ny, nz, day + 1]);
      rear++;
    }
  }
}

let isAllRipe = true;
for (let z = 0; z < H; z++) {
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < M; y++) {
      if (boxList[z][x][y] === 0) {
        isAllRipe = false;
        break;
      }
    }
  }
}

console.log(isAllRipe ? result : -1);
