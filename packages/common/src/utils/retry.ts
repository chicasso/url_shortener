export function retry<T>(
  fn: () => Promise<T>, retries: number = 5, delay: number = 3000,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const attempt = async (currentAttempt: number) => {
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        if (currentAttempt >= retries) {
          reject(error as Error);
        } else {
          setTimeout(() => {
            return void attempt(currentAttempt + 1)
          }, delay);
        }
      }
    };

    void attempt(1);
  });
}
