document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");
    const cursorGlow = document.getElementById("cursorGlow");
    const backTop = document.getElementById("backTop");
    const yearEl = document.getElementById("year");
    const typedEl = document.getElementById("typed");
    const skillsSection = document.querySelector(".skills");
    const heroSection = document.querySelector(".hero");
    const heroBg = document.querySelector(".hero-bg");

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    function updateActiveLink() {
        const scrollPos = window.scrollY + 140;
        const sections = document.querySelectorAll("section[id]");

        sections.forEach((section) => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPos >= top && scrollPos < bottom) {
                navItems.forEach((item) => {
                    item.classList.toggle(
                        "active",
                        item.getAttribute("href") === `#${id}`
                    );
                });
            }
        });
    }

    function handleScroll() {
        const y = window.scrollY;
        if (navbar) navbar.classList.toggle("scrolled", y > 20);
        if (backTop) backTop.classList.toggle("show", y > 500);
        updateActiveLink();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.classList.toggle("open", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", (e) => {
            if (
                navLinks.classList.contains("open") &&
                !navLinks.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {
                navLinks.classList.remove("open");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    if (backTop) {
        backTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
        revealObserver.observe(el);
    });

    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        skillsObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );
        skillsObserver.observe(skillsSection);
    }

    if (typedEl) {
        const roles = [
            "Full-Stack Developer",
            "Laravel Developer",
            "Frontend Engineer",
            "Problem Solver"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const typeSpeed = 90;
        const deleteSpeed = 45;
        const pauseTime = 1600;

        function typeLoop() {
            const current = roles[roleIndex];

            if (!deleting) {
                typedEl.textContent = current.slice(0, charIndex + 1);
                charIndex++;

                if (charIndex === current.length) {
                    deleting = true;
                    setTimeout(typeLoop, pauseTime);
                    return;
                }
            } else {
                typedEl.textContent = current.slice(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            setTimeout(typeLoop, deleting ? deleteSpeed : typeSpeed);
        }

        typeLoop();
    }

    if (cursorGlow && window.matchMedia("(hover: hover)").matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let glowX = mouseX;
        let glowY = mouseY;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateGlow() {
            glowX += (mouseX - glowX) * 0.12;
            glowY += (mouseY - glowY) * 0.12;
            cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateGlow);
        }

        animateGlow();

        document.addEventListener("mouseleave", () => {
            cursorGlow.style.opacity = "0";
        });

        document.addEventListener("mouseenter", () => {
            cursorGlow.style.opacity = "0.35";
        });
    }

    if (heroSection && heroBg && window.matchMedia("(hover: hover)").matches) {
        const blobs = heroBg.querySelectorAll(".blob");

        heroSection.addEventListener("mousemove", (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            blobs.forEach((blob, i) => {
                const depth = (i + 1) * 20;
                blob.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
            });
        });
    }
});