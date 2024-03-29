// https://paldb.cc
const data = [
  ["CraftSpeed_up2", "工匠精神", "3"],
  ["CraftSpeed_up1", "认真", "2"],
  ["CraftSpeed_down1", "笨手笨脚", "-1"],
  ["CraftSpeed_down2", "偷懒成瘾", "-3"],
  ["Deffence_up2", "顽强肉体", "3"],
  ["Deffence_up1", "坚硬皮肤", "1"],
  ["Deffence_down1", "弱不禁风", "-1"],
  ["Deffence_down2", "骨质疏松", "-3"],
  ["Noukin", "脑筋", "2"],
  ["Rare", "稀有", "3"],
  ["Legend", "传说", "3"],
  ["PAL_ALLAttack_up2", "凶猛", "3"],
  ["PAL_ALLAttack_up1", "勇敢", "1"],
  ["PAL_ALLAttack_down1", "胆小", "-1"],
  ["PAL_ALLAttack_down2", "消极主义", "-3"],
  ["PAL_rude", "粗暴", "1"],
  ["PAL_conceited", "自恋狂", "1"],
  ["PAL_sadist", "虐待狂", "1"],
  ["PAL_masochist", "受虐狂", "1"],
  ["PAL_CorporateSlave", "社畜", "1"],
  ["PAL_oraora", "强势", "1"],
  ["TrainerATK_UP_1", "突袭指挥官", "3"],
  ["TrainerDEF_UP_1", "铁壁军师", "3"],
  ["TrainerWorkSpeed_UP_1", "啦啦队", "3"],
  ["TrainerMining_up1", "矿山首领", "3"],
  ["TrainerLogging_up1", "采伐领袖", "3"],
  ["ElementResist_Normal_1_PAL", "一反常态", "1"],
  ["ElementResist_Fire_1_PAL", "拥抱烈日", "1"],
  ["ElementResist_Aqua_1_PAL", "防水性能", "1"],
  ["ElementResist_Thunder_1_PAL", "绝缘体", "1"],
  ["ElementResist_Leaf_1_PAL", "除草效果", "1"],
  ["ElementResist_Ice_1_PAL", "高温体质", "1"],
  ["ElementResist_Earth_1_PAL", "抗震结构", "1"],
  ["ElementResist_Dark_1_PAL", "阳光开朗", "1"],
  ["ElementResist_Dragon_1_PAL", "屠龙者", "1"],
  ["ElementBoost_Normal_1_PAL", "禅境", "1"],
  ["ElementBoost_Fire_1_PAL", "喜欢玩火", "1"],
  ["ElementBoost_Aqua_1_PAL", "喜欢戏水", "1"],
  ["ElementBoost_Thunder_1_PAL", "电容", "1"],
  ["ElementBoost_Leaf_1_PAL", "草木馨香", "1"],
  ["ElementBoost_Ice_1_PAL", "冷血", "1"],
  ["ElementBoost_Earth_1_PAL", "大地之力", "1"],
  ["ElementBoost_Dark_1_PAL", "夜幕", "1"],
  ["ElementBoost_Dragon_1_PAL", "龙之血脉", "1"],
  ["PAL_FullStomach_Up_1", "贪吃", "-1"],
  ["PAL_FullStomach_Up_2", "无底之胃", "-2"],
  ["PAL_FullStomach_Down_1", "小胃", "1"],
  ["PAL_FullStomach_Down_2", "节食大师", "3"],
  ["PAL_Sanity_Up_1", "情绪不稳", "-1"],
  ["PAL_Sanity_Up_2", "毁灭欲望", "-2"],
  ["PAL_Sanity_Down_1", "积极思维", "1"],
  ["PAL_Sanity_Down_2", "工作狂", "3"],
  ["ElementBoost_Normal_2_PAL", "圣天", "3"],
  ["ElementBoost_Fire_2_PAL", "炎帝", "3"],
  ["ElementBoost_Aqua_2_PAL", "海皇", "3"],
  ["ElementBoost_Thunder_2_PAL", "雷帝", "3"],
  ["ElementBoost_Leaf_2_PAL", "精灵王", "3"],
  ["ElementBoost_Ice_2_PAL", "冰帝", "3"],
  ["ElementBoost_Earth_2_PAL", "岩帝", "3"],
  ["ElementBoost_Dark_2_PAL", "冥王", "3"],
  ["ElementBoost_Dragon_2_PAL", "神龙", "3"],
  ["MoveSpeed_up_1", "灵活", "1"],
  ["MoveSpeed_up_2", "运动健将", "2"],
  ["MoveSpeed_up_3", "神速", "3"],
  ["HP_ACC_up1", "提升体力Lv1", "1"],
  ["HP_ACC_up2", "提升体力Lv2", "2"],
  ["HP_ACC_up3", "提升体力Lv3", "3"],
  ["Attack_ACC_up1", "提升攻击Lv1", "1"],
  ["Attack_ACC_up2", "提升攻击Lv2", "2"],
  ["Attack_ACC_up3", "提升攻击Lv3", "3"],
  ["defense_ACC_up1", "提升防御Lv1", "1"],
  ["defense_ACC_up2", "提升防御Lv2", "2"],
  ["defense_ACC_up3", "提升防御Lv3", "3"],
  ["WorkSpeed_ACC_up1", "高速工作Lv1", "1"],
  ["WorkSpeed_ACC_up2", "高速工作Lv2", "2"],
  ["WorkSpeed_ACC_up3", "高速工作Lv3", "3"],
  ["TemperatureResist_Heat1", "耐暑Lv1", "1"],
  ["TemperatureResist_Heat2", "耐暑Lv2", "2"],
  ["TemperatureResist_Heat3", "耐暑Lv3", "3"],
  ["TemperatureResist_Cold1", "耐寒Lv1", "1"],
  ["TemperatureResist_Cold2", "耐寒Lv2", "2"],
  ["TemperatureResist_Cold3", "耐寒Lv3", "3"],
  ["MaxInventoryWeight_up", "提升负重上限Lv1", "3"],
  ["MaxInventoryWeight_up2", "提升负重上限Lv2", "-1"],
  ["MaxInventoryWeight_up3", "提升负重上限Lv3", "-1"],
  ["PAL_SpiritualInst", "精神不稳定", "-1"],
  ["ElementResist_Normal_1", "减轻无属性伤害Lv1", "1"],
  ["ElementResist_Fire_1", "减轻火属性伤害Lv1", "1"],
  ["ElementResist_Aqua_1", "减轻水属性伤害Lv1", "1"],
  ["ElementResist_Thunder_1", "减轻雷属性伤害Lv1", "1"],
  ["ElementResist_Leaf_1", "减轻草属性伤害Lv1", "1"],
  ["ElementResist_Ice_1", "减轻冰属性伤害Lv1", "1"],
  ["ElementResist_Earth_1", "减轻地属性伤害Lv1", "1"],
  ["ElementResist_Dark_1", "减轻暗属性伤害Lv1", "1"],
  ["ElementResist_Dragon_1", "减轻龙属性伤害Lv1", "1"],
  ["ElementResist_Normal_2", "减轻无属性伤害Lv2", "2"],
  ["ElementResist_Fire_2", "减轻火属性伤害Lv2", "2"],
  ["ElementResist_Aqua_2", "减轻水属性伤害Lv2", "2"],
  ["ElementResist_Thunder_2", "减轻雷属性伤害Lv2", "2"],
  ["ElementResist_Leaf_2", "减轻草属性伤害Lv2", "2"],
  ["ElementResist_Ice_2", "减轻冰属性伤害Lv2", "2"],
  ["ElementResist_Earth_2", "减轻地属性伤害Lv2", "2"],
  ["ElementResist_Dark_2", "减轻暗属性伤害Lv2", "2"],
  ["ElementResist_Dragon_2", "减轻龙属性伤害Lv2", "2"],
  ["ElementResist_Normal_3", "减轻无属性伤害Lv3", "3"],
  ["ElementResist_Fire_3", "减轻火属性伤害Lv3", "3"],
  ["ElementResist_Aqua_3", "减轻水属性伤害Lv3", "3"],
  ["ElementResist_Thunder_3", "减轻雷属性伤害Lv3", "3"],
  ["ElementResist_Leaf_3", "减轻草属性伤害Lv3", "3"],
  ["ElementResist_Ice_3", "减轻冰属性伤害Lv3", "3"],
  ["ElementResist_Earth_3", "减轻地属性伤害Lv3", "3"],
  ["ElementResist_Dark_3", "减轻暗属性伤害Lv3", "3"],
  ["ElementResist_Dragon_3", "减轻龙属性伤害Lv3", "3"],
].reduce((acc, cur) => {
  acc[cur[0] || ""] = [cur[1], cur[2]];
  return acc;
}, {} as Record<string, [string, string]>);

export default data;
