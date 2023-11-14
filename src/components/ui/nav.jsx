import Button from "./button";

export const Nav = () => {
  return (
    <div className="absolute top-0 flex w-full justify-between p-2 text-lg">
      <Button href="/">embersee</Button>

      <div className="flex space-x-4">
        <Button href="/about">about</Button>

        <Button href="/about">contact</Button>
      </div>
    </div>
  );
};
