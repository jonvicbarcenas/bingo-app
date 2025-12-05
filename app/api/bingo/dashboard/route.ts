export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const bcode = searchParams.get("bcode")

  if (!bcode) {
    return Response.json({ error: "Missing game code" }, { status: 400 })
  }

  try {
    // The dashboard endpoint returns HTML, not JSON
    // We'll validate the game code by checking if we can get a card
    const response = await fetch(`http://www.hyeumine.com/getcard.php?bcode=${bcode}`)
    
    if (!response.ok) {
      console.log("[v0] Dashboard validation failed, status:", response.status)
      return Response.json({ error: "Game not found" }, { status: 404 })
    }

    const data = await response.json()
    
    // If the API returns 0, the game code is invalid
    if (data === 0 || !data.playcard_token) {
      console.log("[v0] Invalid game code:", bcode)
      return Response.json({ error: "Invalid game code" }, { status: 404 })
    }

    console.log("[v0] Game validated:", bcode)
    return Response.json({ valid: true, bcode })
  } catch (error) {
    console.log("[v0] Dashboard error:", error)
    return Response.json({ error: "Failed to validate game" }, { status: 500 })
  }
}
