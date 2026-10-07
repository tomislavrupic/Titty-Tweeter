const characters = {
  dark: ['DARK / VELVET HISS', 'Darker highs. Strong de-essing. Velvet restraint.'],
  ivory: ['IVORY / OPEN WINDOW', 'Open air. Gentle control. A lighter touch.'],
  walnut: ['WALNUT / WARM VALVES', 'Rounded highs. Broad presence. Warm manners.'],
  neon: ['NEON / ELECTRIC SILK', 'Bright sheen. Wider highs. Pink confidence.'],
  americana: ['AMERICANA / EAGLE MODE', 'One POWER knob. High lift and selective 10 kHz de-essing.'],
  mint: ['MINT / FRESH START', 'Focused 10 kHz cleanup. Fresh perspective.'],
  selene: ['SELENE / MIDNIGHT LACE', 'Focused 10 kHz hiss control. A little air. Full goth.']
};
const tabs = [...document.querySelectorAll('[data-skin]')];
function selectCharacter(skin, focus = false) {
  if (!characters[skin]) return;
  const [title, description] = characters[skin];
  for (const tab of tabs) {
    const selected = tab.dataset.skin === skin;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  }
  document.querySelector('#character-image').src = `assets/${skin}.webp`;
  document.querySelector('#character-image').alt = `Actual Titty Tweeter ${skin} plugin interface`;
  document.querySelector('#character-title').textContent = title;
  document.querySelector('#character-description').textContent = description;
  document.querySelector('#character-panel').setAttribute('aria-labelledby', `tab-${skin}`);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectCharacter(tab.dataset.skin));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectCharacter(tabs[next].dataset.skin, true); }
  });
});
document.querySelector('#see-americana').addEventListener('click', () => selectCharacter('americana'));
fetch('release.json').then(response => {
  if (!response.ok) throw new Error('Release metadata unavailable');
  return response.json();
}).then(release => {
  document.querySelector('#signing-status').textContent = release.signing;
}).catch(() => {
  document.querySelector('#signing-status').textContent = 'See the GitHub release for signing and compatibility details.';
});
