

export const delay = async (interval: number) => {
  return new Promise((res, _) => {
    setTimeout(() => {
      res(1)
    }, interval)
  })
}