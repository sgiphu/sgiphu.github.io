
<script>
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));
  render();
}

function render() {
  const list = document.getElementById("cart");
  list.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.textContent = `${item.name} × ${item.qty} `;
    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.onclick = () => { cart = cart.filter(i => i.id !== item.id); save(); };
    li.appendChild(btn);
    list.appendChild(li);
  });
  document.getElementById("total").textContent = total;
}

document.querySelectorAll(".add").forEach(btn => {
  btn.onclick = () => {
    const { id, name, price } = btn.dataset;
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty++;
    else cart.push({ id, name, price: Number(price), qty: 1 });
    save();
  };
});

render();
</script>
