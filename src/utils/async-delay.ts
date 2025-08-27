export async function asyncDelay(milliseconds: number = 0, verbose = false) {
  if (milliseconds <= 0) return;

  if (verbose) {
    console.log(`dev delay applied -> ${milliseconds}ms`);
  }

  await new Promise(resolve => setTimeout(resolve, milliseconds));
}
