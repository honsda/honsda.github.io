<script>
  import { onMount } from 'svelte';
  
  let selectedIndex = 0;
  const options = ['about', 'projects', 'socials'];
  $: selected = options[selectedIndex];

  const content = {
    about: {
      title: "About Me",
      body: "I'm a developer building things on the web. Passionate about clean code and minimalist design. I enjoy turning complex problems into simple, beautiful, and intuitive solutions."
    },
    projects: {
      title: "My Projects",
      body: "Working on various open-source projects and personal experiments. From low-level systems to high-level UI components, I love exploring the full stack."
    },
    socials: {
      title: "Connect with Me",
      body: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions. Find me on GitHub, Twitter, or LinkedIn."
    }
  };

  let typedTitle = "";
  let typedBody = "";
  let contentOpacity = 1;
  let typingId = 0;

  async function typeContent(option) {
    const id = ++typingId;
    const jumbleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>?/";
    const title = content[option].title;
    const body = content[option].body;
    
    // Fade Out
    contentOpacity = 0;
    await new Promise(r => setTimeout(r, 400));
    if (id !== typingId) return;

    typedTitle = "";
    typedBody = "";
    contentOpacity = 1;

    // Scramble Resolve Animation (Slower than 400ms fade-in)
    const iterations = 30;
    for (let i = 0; i <= iterations; i++) {
      await new Promise(r => setTimeout(r, 20));
      if (id !== typingId) return;
      
      const progress = i / iterations;
      
      typedTitle = title.split('').map((c, idx) => {
        if (c === ' ') return ' ';
        const charProgress = (idx / title.length);
        return progress > charProgress * 0.7 + 0.1 ? c : jumbleChars[Math.floor(Math.random() * jumbleChars.length)];
      }).join('');
      
      typedBody = body.split('').map((c, idx) => {
        if (c === ' ') return ' ';
        const charProgress = (idx / body.length);
        return progress > charProgress * 0.7 + 0.1 ? c : jumbleChars[Math.floor(Math.random() * jumbleChars.length)];
      }).join('');
    }

    // Final safety set
    typedTitle = title;
    typedBody = body;
  }

  $: if (selected) typeContent(selected);

  let baseHeight = 2.5;
  let marginSize = 1;

  function handleKeydown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedIndex = (selectedIndex + 1) % options.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedIndex = (selectedIndex - 1 + options.length) % options.length;
    }
  }

  function updateSizes() {
    const isMobile = window.innerWidth < 768;
    baseHeight = isMobile ? 2 : 2.5;
    marginSize = isMobile ? 0.75 : 1;
  }

  onMount(() => {
    updateSizes();
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', updateSizes);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', updateSizes);
    };
  });
</script>

<div class="mt-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start opacity-0 animate-fade-in-up animation-delay-400 fill-mode-forwards">
  <!-- Left side: CMD Prompt -->
  <div class="flex flex-col gap-6">
    <div class="bg-[#0e0f14] rounded-2xl border border-white/5 p-6 md:p-10 font-mono shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[300px] md:min-h-[320px] flex flex-col items-start relative group">
      <!-- Clipping container for decorative background glow -->
      <div class="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div class="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/5 blur-[100px] rounded-full group-hover:bg-emerald-500/10 transition-colors duration-700"></div>
      </div>

      <!-- Window Controls -->
      <div class="absolute top-4 left-6 md:top-6 md:left-8 flex gap-2.5">
        <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56] opacity-40 group-hover:opacity-100 transition-opacity"></div>
        <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e] opacity-40 group-hover:opacity-100 transition-opacity"></div>
        <div class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f] opacity-40 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <!-- OS Header and Initial Message -->
      <div class="w-full space-y-2 mb-auto pt-4 md:pt-6">
        <p class="text-slate-600 text-[9px] md:text-[10px] tracking-wider uppercase">honsdaOS ver.1.0 - stuff</p>
        <p class="text-white text-xs md:text-sm font-bold">what do you want to see?</p>
      </div>

      <!-- Command Prompt -->
      <div class="flex items-center text-lg md:text-2xl w-full relative mt-4 md:mt-6" style="height: {baseHeight}rem;">
        <div class="flex items-center shrink-0 h-full">
          <span class="text-emerald-500 font-bold tracking-tight">guest@honsda:~$</span>
          <span class="text-white/90 ml-2 md:ml-4 font-medium">cd</span>
        </div>
        
        <!-- Vertical Selection Window -->
        <div class="relative ml-2 md:ml-4 flex-1 h-full overflow-visible">
          <div 
            class="absolute top-0 left-0 z-50 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)"
            style="transform: translateY(-{selectedIndex * baseHeight + marginSize}rem)"
          >
            {#each options as option, i}
              <div 
                class="flex flex-col items-start justify-start transition-all duration-500 overflow-visible"
                style="height: {i === selectedIndex ? baseHeight + (marginSize * 2) : baseHeight}rem;"
              >
                <div class="relative flex items-center transition-all duration-300
                  {i === selectedIndex 
                    ? 'bg-transparent scale-105 md:scale-110 z-10 rounded-none' 
                    : 'bg-[#1e2029] border-transparent scale-100 rounded-none z-0'}"
                  style="height: {baseHeight}rem; margin-top: {i === selectedIndex ? marginSize : 0}rem;"
                >
                  <span class="text-white font-bold transition-all duration-150 mx-2 md:mx-4 border-b-2 pb-1
                    {i === selectedIndex ? 'opacity-100 border-emerald-500/30' : 'opacity-20 border-transparent'}">
                    {option}
                  </span>
                  {#if i === selectedIndex}
                    <span class="inline-block w-1.5 md:w-2.5 h-4 md:h-6 bg-emerald-400 ml-[-0.25rem] md:ml-[-0.5rem] animate-fast-blink shadow-[0_0_20px_rgba(52,211,153,0.8)] shrink-0"></span>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- Clue / Hint -->
    <div class="flex flex-col gap-3 px-8">
      <div class="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
        <div class="flex gap-1.5">
          <span class="w-6 h-6 flex items-center justify-center rounded border border-white/10 bg-white/5">↑</span>
          <span class="w-6 h-6 flex items-center justify-center rounded border border-white/10 bg-white/5">↓</span>
        </div>
        <span>Navigate to explore</span>
      </div>
    </div>
  </div>

  <!-- Right side: Content -->
  <div class="relative md:pt-12 min-h-[400px]">
    <div class="space-y-8 absolute inset-x-0 top-12 transition-opacity duration-400" style="opacity: {contentOpacity}">
      <div class="space-y-2">
        <span class="text-emerald-500/50 font-mono text-xs uppercase tracking-[0.4em] block">Section</span>
        <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tighter min-h-[1.2em]">
          {typedTitle}
        </h2>
      </div>
      
      <p class="text-slate-400 leading-relaxed text-lg md:text-xl font-light max-w-lg border-l-2 border-emerald-500/20 pl-8 min-h-[6em]">
        {typedBody}
      </p>
    </div>
  </div>
</div>

<style>
  .fill-mode-forwards {
    animation-fill-mode: forwards;
  }
</style>
