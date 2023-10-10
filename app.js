const { a, div, li, p, ul, h1, button, title, span, img } = van.tags;

const DateTime = () => {
  const [hours, minute, second] = [van.state(0), van.state(0), van.state(0)];
  let id;
  const start = () =>
    (id =
      id ||
      setInterval(() => {
        const currentDate = new Date();
        hours.val = currentDate.getHours();
        minute.val = currentDate.getMinutes();
        second.val = currentDate.getSeconds();
      }, 1000));
  start();
  return div({ class: "m-8" }, () =>
    span(
      { class: "countdown font-mono text-4xl" },
      span({ style: () => `--value:${hours.val}` }),
      ":",
      span({ style: () => `--value:${minute.val}` }),
      ":",
      span({ style: () => `--value:${second.val}` })
    )
  );
};

const Hello = () =>
  div(
    { class: "max-w-md" },
    DateTime(),
    h1({ class: "text-2xl font-bold" }, "👋Hello, I'm wk18k"),
    p(
      { class: "py-6" },
      "We're committed to providing you with the best possible experience."
    ),
    a(
      { href: "https://github.com/watchakorn-18k" },
      button({ class: "btn btn-primary" }, "Go to my github")
    )
  );

const getIP = (json) => {
  document.title += ` | ${json.ip}`;
};

const HeroPage = () => {
  fetch("https://checkip.amazonaws.com/")
    .then((res) => console.log(res.text()))
    .then((data) => console.log(data));
  return div(
    {
      class:
        "hero min-h-screen bg-gradient-to-t from-base-200 to-primary from-[2rem] font-mono"
    },

    div({ class: "hero-content text-center" }, Hello(), title("watchakorn-18k"))
  );
};
const Profile = () => {
  return div(
    { class: "text-center" },
    h1({ class: "text-3xl font-mono" }, "🤳🏻My Profile"),
    div(
      { class: "mx-24" },
      img({
        src:
          "https://github.com/watchakorn-18k/watchakorn-18k/raw/main/github-metrics.svg",
        class: "w-full lg:w-[40rem]"
      })
    )
  );
};

const Main = () =>
  div(
    { class: "bg-base-200 flex flex-col gap-2 items-center text-white" },
    () => HeroPage(),
    Profile()
  );
//https://holopin.io/@wk18k
van.add(document.body, Main());
