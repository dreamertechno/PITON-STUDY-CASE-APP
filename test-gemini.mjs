const apiKey = "AIzaSyANI64VtBXXxi7j-1KuTfMSxpaGzl_o8U0";
async function list() {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const json = await res.json();
  console.log(json.models.map(m => m.name));
}
list();
