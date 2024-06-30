export default function (htmlRelativeUrl: string, baseUrl: string): Promise<string> {
  const htmlUrl = new URL(htmlRelativeUrl, baseUrl).href;
  return fetch(htmlUrl).then(response => response.text());
}
