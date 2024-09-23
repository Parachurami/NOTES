import { Entypo, SimpleLineIcons } from "@expo/vector-icons";
import {COLORS} from "../assets/misc/colors";

const screenData = [
    {
      name:'MyNotes',
      title: 'My Notes',
      icon: <SimpleLineIcons name="note" size={24} color={COLORS.primaryColor} />,
      inactiveIcon: <SimpleLineIcons name="note" size={24} color={COLORS.black} />
    },
    {
      name:'To-doList',
      title:'To-do List',
      icon: <Entypo name='check' size={24} color={COLORS.primaryColor}/>,
      inactiveIcon: <Entypo name='check' size={24} color={COLORS.black}/>
    },
    {
      name:'Projects',
      title:'Projects',
      icon: <SimpleLineIcons name='notebook' size={24} color={COLORS.primaryColor}/>,
      inactiveIcon: <SimpleLineIcons name='notebook' size={24} color={COLORS.black}/>
    },
    {
      name:'Journal',
      title:'Journal',
      icon: <SimpleLineIcons name='pencil' size={24} color={COLORS.primaryColor}/>,
      inactiveIcon: <SimpleLineIcons name='pencil' size={24} color={COLORS.black}/>
    },
    {
      name:'ReadingList',
      title:'Reading List',
      icon: <Entypo name='open-book' size={24} color={COLORS.primaryColor}/>,
      inactiveIcon: <Entypo name='open-book' size={24} color={COLORS.black}/>
    },
  ];

  export default screenData;