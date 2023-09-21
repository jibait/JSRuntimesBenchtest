const url = "https://data.gharchive.org/2015-01-{01..31}-{0..23}.json.gz";
const port = 8080;

const handler = (request: Request): Response => {
  const body = `Your user-agent is:\n\n${
    request.headers.get("user-agent") ?? "Unknown"
  }`;

  return new Response(body, { status: 200 });
};


// Enregistrez le moment où vous démarrez la requête
const startTime = Date.now();

// Effectuez la requête HTTP
fetch(url)
  .then(async (res) => {
    console.log('statusCode:', res.status);
    console.log('headers:', res.headers);

    // Récupérez le corps de la réponse sous forme de tableau d'octets (Uint8Array)
    const body = new Uint8Array(await res.arrayBuffer());

    // Affichez le contenu du corps de la réponse
    console.log(new TextDecoder().decode(body));

    // Enregistrez le moment où la réponse est reçue
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log(`Durée du chargement : ${duration} ms`);
  })
  .catch((error) => {
    console.error('Erreur lors de la requête :', error);
  });

console.log(`HTTP server running. Access it at: http://localhost:8080/`);
Deno.serve({ port }, handler);