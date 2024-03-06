export function getImageUrl(name) {
  const path = `../../../assets/TuLi/${name}.png`;
  const modules = import.meta.globEager("@/assets/TuLi/*.png");
  return modules[path].default;
}
export const Tuli = [
  {
    name:'报警点位',
    List:[
      {
        name:'监测站报警',
      },{
        name:'水表报警',
      }
    ]
  },
  {
    name:'税务图例',
    List:[
      {
        name:'取水点',
      },{
        name:'用水企业',
      },
      {
        name:'监测站',
      }
    ]
  }
]
