/* Edit only these resource URLs to activate the corresponding buttons.
 * Local file example: thesis: './static/pdfs/thesis.pdf'
 * External example: code: 'https://github.com/YOUR_USERNAME/YOUR_CODE_REPOSITORY'
 * Keep null for resources that are not available yet. */
const RESOURCE_LINKS = {
  thesis: 'static/pdfs/thesis_shuyi_wu.pdf',
  code: null,
  video: null,
  poster: 'static/pdfs/poster.pdf',
};

(() => {
  'use strict';
  const resourceInfo = {
    thesis: ['Full thesis PDF', 'The final thesis manuscript has not been added to this local project page yet.'],
    code: ['Code and model', 'The public implementation and model-download links have not been added yet.'],
    video: ['Project video', 'The project demonstration video has not been added yet.'],
    poster: ['Poster / slides', 'The presentation material has not been added yet.'],
  };
  const resourceDialog = document.querySelector('#resource-dialog');
  document.querySelectorAll('[data-resource]').forEach(link => {
    const key = link.dataset.resource;
    const url = RESOURCE_LINKS[key];
    if (typeof url === 'string' && url.trim()) {
      link.href = url.trim();
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.querySelector('.button-pending')?.remove();
      const state = link.querySelector('.resource-state');
      if (state) { state.textContent = 'OPEN ↗'; state.style.color = '#397b73'; }
      return;
    }
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      event.preventDefault();
      const [title, description] = resourceInfo[key] || ['Resource pending', 'This resource has not been added yet.'];
      document.querySelector('#resource-dialog-title').textContent = title;
      document.querySelector('#resource-dialog-description').textContent = description;
      resourceDialog.showModal();
    });
  });
  document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => resourceDialog.close()));
  resourceDialog.addEventListener('click', event => { if (event.target === resourceDialog) resourceDialog.close(); });

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  function selectTab(tab, focus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft') target = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') target = tabs[0];
      if (event.key === 'End') target = tabs[tabs.length - 1];
      if (target) { event.preventDefault(); selectTab(target, true); }
    });
  });

  const imageDialog = document.querySelector('#image-dialog');
  const enlargedImage = document.querySelector('#lightbox-image');
  document.querySelectorAll('[data-lightbox]').forEach(button => {
    button.addEventListener('click', () => {
      enlargedImage.src = button.dataset.lightbox;
      enlargedImage.alt = button.querySelector('img')?.alt || 'Enlarged research figure';
      document.querySelector('#lightbox-caption').textContent = button.dataset.caption || '';
      imageDialog.showModal();
      document.documentElement.classList.add('modal-open');
    });
  });
  document.querySelector('[data-close-image]').addEventListener('click', () => imageDialog.close());
  imageDialog.addEventListener('click', event => { if (event.target === imageDialog) imageDialog.close(); });
  imageDialog.addEventListener('close', () => document.documentElement.classList.remove('modal-open'));

  const copyButton = document.querySelector('#copy-citation');
  copyButton?.addEventListener('click', async () => {
    const citation = document.querySelector('#bibtex-code').textContent;
    const status = document.querySelector('#copy-status');
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(citation);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = citation;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand('copy');
        textarea.remove();
        if (!copied) throw new Error('Copy unavailable');
      }
      copyButton.textContent = 'Copied ✓';
      status.textContent = 'Draft citation copied. Replace all TODO fields before citing.';
      setTimeout(() => { copyButton.textContent = 'Copy BibTeX'; }, 2500);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(document.querySelector('#bibtex-code'));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Citation selected. Press Ctrl+C or Command+C to copy.';
    }
  });
})();
