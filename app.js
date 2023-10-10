
const { a, div, li, p, ul, h1, button, title, span } = van.tags;

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
      { class: "countdown font-mono text-3xl" },
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
    DateTime({}),
    h1({ class: "text-3xl font-bold" }, "👋Hello, I'm wk18k"),
    p(
      { class: "py-6" },
      "We're committed to providing you with the best possible experience."
    ),
    button({ class: "btn btn-primary" }, "Go to my github")
  );

const HeroPage = () =>
  div(
    { class: "hero min-h-screen bg-base-200 font-mono" },

    div({ class: "hero-content text-center" }, Hello(), title("WK-18K"))
  );

const Main = () => div(HeroPage());
van.add(document.body, Main());
