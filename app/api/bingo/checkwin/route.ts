export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const playcard_token = searchParams.get("playcard_token")

  if (!playcard_token) {
    return Response.json({ error: "Missing playcard token" }, { status: 400 })
  }

  try {
    const response = await fetch(`http://www.hyeumine.com/checkwin.php?playcard_token=${playcard_token}`)
    const text = await response.text()

    console.log("[v0] Win check response:", text)
    return Response.json({ result: text })
  } catch (error) {
    console.log("[v0] Win check error:", error)
    return Response.json({ result: "0" })
  }
}
