import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CancelEditButton({onClick}:{onClick:()=>void}){

  return (
    <button
    className="mt-4 font-medium w-full flex justify-center gap-3 items-center text-gray-400"
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faClose} />
    Cancel edit
  </button>
  )
}

