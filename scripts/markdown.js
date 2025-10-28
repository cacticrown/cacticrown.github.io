function loadMarked() {
  return new Promise((resolve, reject) => {
    if (window.marked) return resolve();
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function loadMarkdown(filepath, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(filepath);
    if (!response.ok) throw new Error(`Markdown not found: ${filepath}`);
    const md = await response.text();

    await loadMarked();

    container.innerHTML = marked.parse(md);
  } catch (err) {
    container.innerHTML = `<p>Error loading markdown: ${err}</p>`;
    console.error(err);
  }
}

window.markdownLoader = { load: loadMarkdown };