export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const bcode = searchParams.get("bcode")

  if (!bcode) {
    return Response.json({ error: "Missing game code" }, { status: 400 })
  }

  try {
    const response = await fetch(`http://www.hyeumine.com/getcard.php?bcode=${bcode}`)

    if (!response.ok) {
      console.log("[v0] Get card status:", response.status)
      return Response.json(0)
    }

    const data = await response.json()
    console.log("[v0] Card data received:", data)

    // If the API returns 0, the game code is invalid
    if (data === 0 || !data.playcard_token || !data.card) {
      console.log("[v0] Invalid card data")
      return Response.json(0)
    }

    // Transform the card data from {B: [], I: [], N: [], G: [], O: []} to a 2D array
    // The API returns card as an object with B, I, N, G, O keys, each with 5 numbers
    const cardObject = data.card
    const cardArray: number[][] = []
    
    // Convert to row-based 2D array (5x5 grid)
    for (let row = 0; row < 5; row++) {
      cardArray.push([
        cardObject.B[row],
        cardObject.I[row],
        cardObject.N[row],
        cardObject.G[row],
        cardObject.O[row],
      ])
    }

    console.log("[v0] Transformed card array:", cardArray)

    return Response.json({
      playcard_token: data.playcard_token,
      card: cardArray,
    })
  } catch (error) {
    console.log("[v0] Get card error:", error)
    return Response.json(0)
  }
}
