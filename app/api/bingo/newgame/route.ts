export async function GET() {
  try {
    const response = await fetch("http://www.hyeumine.com/newbingogame.php")
    
    if (!response.ok) {
      console.log("[v0] New game creation failed:", response.status)
      return Response.json({ error: "Failed to create new game" }, { status: 500 })
    }

    // Get the HTML response
    const html = await response.text()
    console.log("[v0] New game HTML response received")

    // Extract the game code from the HTML
    // Looking for: <h1> Game Code: H61hu0rq</h1>
    const match = html.match(/<h1>\s*Game Code:\s*([A-Za-z0-9]+)\s*<\/h1>/i)
    
    if (match && match[1]) {
      const bcode = match[1]
      console.log("[v0] New game code created:", bcode)
      return Response.json({ 
        bcode, 
        url: `http://www.hyeumine.com/bingodashboard.php?bcode=${bcode}` 
      })
    }

    // If we couldn't extract the code
    console.log("[v0] Could not extract game code from HTML")
    return Response.json({ error: "Could not extract game code" }, { status: 500 })
  } catch (error) {
    console.log("[v0] New game error:", error)
    return Response.json({ error: "Failed to create new game" }, { status: 500 })
  }
}
