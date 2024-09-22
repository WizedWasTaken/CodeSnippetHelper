// utils/languageUtils.ts
import { Language } from "@/entities/Language";
import { FaJs, FaPython, FaJava, FaPhp, FaHtml5, FaCss3Alt, FaDatabase, FaGem, FaChair } from "react-icons/fa";

export const getLanguageName = (language: Language): string => {
    console.log(language);
  switch (language) {
    case Language.JavaScript:
      return "JavaScript";
    case Language.CSS:
      return "CSS";
    case Language.Python:
      return "Python";
    case Language.HTML:
        return "HTML";
    case Language.Java:
        return "Java";
    case Language.PHP:
        return "PHP";
    case Language.Ruby:
        return "Ruby";
    case Language.CSharp:
        return "CSharp";
    case Language.SQL:
        return "SQL";
    default:
        return "Ukendt sprog";
  }
};

export const languageIcons = {
  [Language.JavaScript]: FaJs,
  [Language.Python]: FaPython,
  [Language.Java]: FaJava,
  [Language.PHP]: FaPhp,
  [Language.HTML]: FaHtml5,
  [Language.CSS]: FaCss3Alt,
  [Language.SQL]: FaDatabase,
  [Language.Ruby]: FaGem,
  [Language.CSharp]: FaChair,
};