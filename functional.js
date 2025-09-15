/* TYPEWRITER */
const tw = document.getElementById("typewriter");
const words = ["Simplified", "Personalized", "Smarter Care"];
let wi = 0, ci = 0, del = false;
function typeLoop(){
  const word = words[wi];
  tw.textContent = word.slice(0, ci);
  if(!del && ci < word.length){ci++;}
  else if(del && ci > 0){ci--;}
  else if(ci === word.length){del = true;}
  else{del = false; wi = (wi+1)%words.length;}
  setTimeout(typeLoop, del?70:120);
}
typeLoop();

/* START BUTTON SCROLL */
document.getElementById("startBtn").addEventListener("click",()=>{
  document.getElementById("services").scrollIntoView({behavior:"smooth"});
});

/* CARD ANIMATION */
const cards = document.querySelectorAll(".card");
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")})
},{threshold:.2});
cards.forEach(c=>io.observe(c));

// Dark Mode Toggle
const darkToggle = document.getElementById("darkToggle");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Change hero background dynamically
    const hero = document.querySelector(".hero");
    if (hero) {
      if (document.body.classList.contains("dark-mode")) {
        hero.style.background = "#000";
      } else {
        hero.style.background = "linear-gradient(135deg, #2563EB, #06B6D4)";
      }
    }
  });
}


/* CHATBOT */
const fab=document.getElementById("chatbotFab");
const chat=document.getElementById("chatWindow");
const close=document.getElementById("chatClose");
const body=document.getElementById("chatBody");
fab.addEventListener("click",()=>chat.classList.toggle("open"));
close.addEventListener("click",()=>chat.classList.remove("open"));
document.getElementById("chatSend").addEventListener("click",sendMsg);
function sendMsg(){
  const input=document.getElementById("chatInput");
  if(!input.value.trim())return;
  append("user",input.value);
  setTimeout(()=>append("bot","This is a demo bot 🤖."),600);
  input.value="";
}
function append(type,text){
  const d=document.createElement("div");
  d.className="msg "+type;d.textContent=text;
  body.appendChild(d);body.scrollTop=body.scrollHeight;
}

/* WATERFALL BACKGROUND (Three.js Shader) */
const canvas=document.getElementById("heroEffect");
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z=1;
const geometry=new THREE.PlaneGeometry(2,2);
const material=new THREE.ShaderMaterial({
  uniforms:{time:{value:0}},
  fragmentShader:`
    uniform float time;
    void main(){
      vec2 uv=gl_FragCoord.xy/vec2(${window.innerWidth.toFixed(1)},${window.innerHeight.toFixed(1)});
      float wave=sin(uv.x*15.0+time*2.5)*0.04;
      float r=abs(sin(time+uv.x*3.0));
      gl_FragColor=vec4(r,0.3+0.5*r,1.0,1.0);
    }`
});
const mesh=new THREE.Mesh(geometry,material);
scene.add(mesh);
function animate(){
  requestAnimationFrame(animate);
  material.uniforms.time.value+=0.01;
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.render(scene,camera);
}
animate();
window.addEventListener("resize",()=>renderer.setSize(window.innerWidth,window.innerHeight));
