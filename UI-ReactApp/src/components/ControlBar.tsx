import Button from "@mui/material/Button";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import ButtonGroup from "@mui/material/ButtonGroup";

interface ControlBarProps {
  setFunc: (direction: "prev" | "next") => void;
  first: boolean;
  last: boolean;
}

const ControlBar = (
  {setFunc, first, last}: ControlBarProps
) => {
  // console.log(props)
  return(
    <div>
      <div style={{display: "flex"}}>
        <ButtonGroup>
          <Button 
            onClick={() => setFunc("prev")}
            disabled={first}
            variant="contained"
            color="secondary"
            startIcon={<ArrowLeftIcon />}
          >
            Prev
          </Button>
          <Button
            onClick={() => setFunc("next")}
            disabled={last}
            variant="contained"
            color="secondary"
            endIcon={<ArrowRightIcon />}
          >
            Next
          </Button>
        </ButtonGroup>
        
      </div>
    </div>
  )
}


export default ControlBar;
