// get requst body
export default function getBody(res: Request): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    const data = res.body?.getReader();
    data?.read().then((res) => {
      const data = res.value?.toString();
      if (!data) {
        reject(new Error("No Data"));
        return;
      }
      const obj = JSON.parse(data);
      if (resolve) {
        resolve(obj);
      }
    });
  });
}
