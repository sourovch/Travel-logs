export default function showPass(e, passRef) {
  const btn = e.target;
  const passField = passRef.current;
  if (passField.type === 'password') {
    btn.innerText = 'Hide';
    passField.type = 'text';
    return;
  }

  btn.innerText = 'Show';
  passField.type = 'password';
}
