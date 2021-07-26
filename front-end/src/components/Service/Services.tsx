import LiveTvIcon from "@material-ui/icons/LiveTv";
import TvIcon from "@material-ui/icons/Tv";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import HttpIcon from "@material-ui/icons/Http";
import WifiIcon from "@material-ui/icons/Wifi";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import {
  FaDog,
  FaConciergeBell,
  FaFireExtinguisher,
  FaDoorClosed,
  FaHotTub,
  FaAccessibleIcon,
} from "react-icons/fa";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";
import {
  GiFireplace,
  GiThreeFriends,
  GiWaterFlask,
  GiFirstAidKit,
  GiHanger,
  GiArmoredPants,
  GiPillow,
  GiCoffeePot,
  GiCookingPot,
  GiChickenOven,
  GiAtSea,
  GiCat,
  GiOfficeChair,
  GiElevator,
  GiSmokeBomb,
  GiLockedDoor,
  GiKitchenScale,
  GiBed,
} from "react-icons/gi";
import { BsCheckAll, BsCalendarFill } from "react-icons/bs";
import { Icon, InlineIcon } from "@iconify/react";
import hairDryer from "@iconify-icons/mdi/hair-dryer";
import ironIcon from "@iconify-icons/si-glyph/iron";
import { CgShutterstock, CgSmartHomeRefrigerator, CgGym } from "react-icons/cg";
import { IoIosWater } from "react-icons/io";
import microwaveOven from "@iconify-icons/icon-park-outline/microwave-oven";
import dishwasherIcon from "@iconify-icons/mdi/dishwasher";
import silverwareIcon from "@iconify-icons/mdi/silverware";
import woodStove from "@iconify-icons/si-glyph/wood-stove";
import { AiOutlineClear, AiFillCheckCircle } from "react-icons/ai";
import { MdPets, MdPool, MdWifiTethering } from "react-icons/md";
import { WiSmoke } from "react-icons/wi";
import viewportWide from "@iconify-icons/tabler/viewport-wide";
import humanGreeting from "@iconify-icons/mdi/human-greeting";
import tumbleDryer from "@iconify-icons/mdi/tumble-dryer";
import { RiCheckboxMultipleFill, RiDoorLockBoxFill } from "react-icons/ri";
import outlineOutdoorGrill from "@iconify-icons/ic/outline-outdoor-grill";
import DeckIcon from "@material-ui/icons/Deck";
import AccessibleIcon from "@material-ui/icons/Accessible";
import outlineCrib from "@iconify-icons/ic/outline-crib";
import style from "./Services.module.css";

const Service = (props = { amenities: [] }) => {
  return (
    <div>
      {props.amenities?.map((e) => (
        <div className="div-ulises">
          {(e === "TV" && (
            <p className={style.p}>
              <TvIcon />
              {e}
            </p>
          )) ||
            (e === "Air conditioning" && (
              <p className={style.p}>
                <AcUnitIcon />
                {e}
              </p>
            )) ||
            (e === "Cable TV" && (
              <p className={style.p}>
                <LiveTvIcon />
                {e}
              </p>
            )) ||
            (e === "Internet" && (
              <p className={style.p}>
                <HttpIcon />
                {e}
              </p>
            )) ||
            (e === "Wifi" && (
              <p className={style.p}>
                <WifiIcon />
                {e}
              </p>
            )) ||
            (e === "Kitchen" && (
              <p className={style.p}>
                <GiKitchenScale />
                {e}
              </p>
            )) ||
            (e === "Free parking on premises" && (
              <p className={style.p}>
                <DriveEtaIcon />
                {e}
              </p>
            )) ||
            (e === "Pets allowed" && (
              <p className={style.p}>
                <FaDog />
                {e}
              </p>
            )) ||
            (e === "Paid parking off premises" && (
              <p className={style.p}>
                <LocalParkingIcon />
                {e}
              </p>
            )) ||
            (e === "Smoking allowed" && (
              <p className={style.p}>
                <SmokingRoomsIcon />
                {e}
              </p>
            )) ||
            (e === "Buzzer/wireless intercom" && (
              <p className={style.p}>
                <FaConciergeBell />
                {e}
              </p>
            )) ||
            (e === "Heating" && (
              <p className={style.p}>
                <GiFireplace />
                {e}
              </p>
            )) ||
            (e === "Family/kid friendly" && (
              <p className={style.p}>
                <GiThreeFriends />
                {e}
              </p>
            )) ||
            (e === "Washer" && (
              <p className={style.p}>
                <GiWaterFlask />
                {e}
              </p>
            )) ||
            (e === "First aid kit" && (
              <p className={style.p}>
                <GiFirstAidKit />
                {e}
              </p>
            )) ||
            (e === "Fire extinguisher" && (
              <p className={style.p}>
                <FaFireExtinguisher />
                {e}
              </p>
            )) ||
            (e === "Essentials" && (
              <p className={style.p}>
                <BsCheckAll />
                {e}
              </p>
            )) ||
            (e === "Hangers" && (
              <p className={style.p}>
                <GiHanger />
                {e}
              </p>
            )) ||
            (e === "Hair dryer" && (
              <p className={style.p}>
                <Icon icon={hairDryer} />
                {e}
              </p>
            )) ||
            (e === "Iron" && (
              <p className={style.p}>
                <Icon icon={ironIcon} />
                {e}
              </p>
            )) ||
            (e === "Room-darkening shades" && (
              <p className={style.p}>
                <CgShutterstock />
                {e}
              </p>
            )) ||
            (e === "Hot water" && (
              <p className={style.p}>
                <IoIosWater />
                {e}
              </p>
            )) ||
            (e === "Bed linens" && (
              <p className={style.p}>
                <GiArmoredPants />
                {e}
              </p>
            )) ||
            (e === "Extra pillows and blankets" && (
              <p className={style.p}>
                <GiPillow />
                {e}
              </p>
            )) ||
            (e === "Microwave" && (
              <p className={style.p}>
                <Icon icon={microwaveOven} />
                {e}
              </p>
            )) ||
            (e === "Coffee maker" && (
              <p className={style.p}>
                <GiCoffeePot />
                {e}
              </p>
            )) ||
            (e === "Refrigerator" && (
              <p className={style.p}>
                <CgSmartHomeRefrigerator />
                {e}
              </p>
            )) ||
            (e === "Dishwasher" && (
              <p className={style.p}>
                <Icon icon={dishwasherIcon} />
                {e}
              </p>
            )) ||
            (e === "Dishes and silverware" && (
              <p className={style.p}>
                <Icon icon={silverwareIcon} />
                {e}
              </p>
            )) ||
            (e === "Cooking basics" && (
              <p className={style.p}>
                <GiCookingPot />
                {e}
              </p>
            )) ||
            (e === "Oven" && (
              <p className={style.p}>
                <GiChickenOven />
                {e}
              </p>
            )) ||
            (e === "Stove" && (
              <p className={style.p}>
                <Icon icon={woodStove} />
                {e}
              </p>
            )) ||
            (e === "Cleaning before checkout" && (
              <p className={style.p}>
                <AiOutlineClear />
                {e}
              </p>
            )) ||
            (e === "Waterfront" && (
              <p className={style.p}>
                <GiAtSea />
                {e}
              </p>
            )) ||
            (e === "Pets live on this property" && (
              <p className={style.p}>
                <MdPets />
                {e}
              </p>
            )) ||
            (e === "Cat(s)" && (
              <p className={style.p}>
                <GiCat />
                {e}
              </p>
            )) ||
            (e === "Laptop friendly workspace" && (
              <p className={style.p}>
                <GiOfficeChair />
                {e}
              </p>
            )) ||
            (e === "24-hour check-in" && (
              <p className={style.p}>
                <AiFillCheckCircle />
                {e}
              </p>
            )) ||
            (e === "Pool" && (
              <p className={style.p}>
                <MdPool />
                {e}
              </p>
            )) ||
            (e === "Doorman" && (
              <p className={style.p}>
                <FaDoorClosed />
                {e}
              </p>
            )) ||
            (e === "Gym" && (
              <p className={style.p}>
                <CgGym />
                {e}
              </p>
            )) ||
            (e === "Elevator" && (
              <p className={style.p}>
                <GiElevator />
                {e}
              </p>
            )) ||
            (e === "Smoke detector" && (
              <p className={style.p}>
                <GiSmokeBomb />
                {e}
              </p>
            )) ||
            (e === "Carbon monoxide detector" && (
              <p className={style.p}>
                <WiSmoke />
                {e}
              </p>
            )) ||
            (e === "Lock on bedroom door" && (
              <p className={style.p}>
                <GiLockedDoor />
                {e}
              </p>
            )) ||
            (e === "Long term stays allowed" && (
              <p className={style.p}>
                <BsCalendarFill />
                {e}
              </p>
            )) ||
            (e === "Wide hallway clearance" && (
              <p className={style.p}>
                <Icon icon={viewportWide} />
                {e}
              </p>
            )) ||
            (e === "Host greets you" && (
              <p className={style.p}>
                <Icon icon={humanGreeting} />
                {e}
              </p>
            )) ||
            (e === "Dryer" && (
              <p className={style.p}>
                <Icon icon={tumbleDryer} />
                {e}
              </p>
            )) ||
            (e === "Hot tub" && (
              <p className={style.p}>
                <FaHotTub />
                {e}
              </p>
            )) ||
            (e === "Self check-in" && (
              <p className={style.p}>
                <RiCheckboxMultipleFill />
                {e}
              </p>
            )) ||
            (e === "Lockbox" && (
              <p className={style.p}>
                <RiDoorLockBoxFill />
                {e}
              </p>
            )) ||
            (e === "Ethernet connection" && (
              <p className={style.p}>
                <MdWifiTethering />
                {e}
              </p>
            )) ||
            (e === "BBQ grill" && (
              <p className={style.p}>
                <Icon icon={outlineOutdoorGrill} />
                {e}
              </p>
            )) ||
            (e === "Garden or backyard" && (
              <p className={style.p}>
                <DeckIcon />
                {e}
              </p>
            )) ||
            (e === "Disabled parking spot" && (
              <p className={style.p}>
                <AccessibleIcon />
                {e}
              </p>
            )) ||
            (e === "Step-free access" && (
              <p className={style.p}>
                <FaAccessibleIcon />
                {e}
              </p>
            )) ||
            (e === "Wide clearance to bed" && (
              <p className={style.p}>
                <GiBed />
                {e}
              </p>
            )) ||
            (e === "Pack ’n Play/travel crib" && (
              <p className={style.p}>
                <Icon icon={outlineCrib} />
                {e}
              </p>
            )) ||
            e}
        </div>
      ))}
    </div>
  );
};

export default Service;
