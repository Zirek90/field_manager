import { createContext } from "react";

export const SectionDetailContext = createContext({
  section: null,
  sectionNumber: null,
  extraInfo: "",
  action: "ChangeNote",
});

export const HandleToggleSectionTakenStateContext = createContext(null);

export const AddExtraInfoContext = createContext(null);

