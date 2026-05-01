const apiKey = "YOUR_API_KEY_HERE";
async function list() {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const json = await res.json();
  console.log(json.models.map(m => m.name));
}
list();
