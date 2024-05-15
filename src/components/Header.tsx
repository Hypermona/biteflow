import { Button } from "./ui/button";

interface IHeader {
  handleSave: () => void;
  clearStorage: () => void;
}
function Header({ handleSave, clearStorage }: Readonly<IHeader>) {
  return (
    <nav className="h-[50px] flex justify-end bg-gray-200">
      <div className="m-2">
        <Button
          variant={"outline"}
          className="border-red-600 text-red-600 mr-1"
          onClick={clearStorage}
        >
          Clear All
        </Button>
        <Button className="border-blue-600 text-blue-600" variant={"outline"} onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </nav>
  );
}

export default Header;
