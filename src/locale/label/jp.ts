// https://paldb.cc
const data = [
  ["CraftSpeed_up2", "職人気質", "3"],
  ["CraftSpeed_up1", "まじめ", "2"],
  ["CraftSpeed_down1", "不器用", "-1"],
  ["CraftSpeed_down2", "サボり癖", "-3"],
  ["Deffence_up2", "屈強な肉体", "3"],
  ["Deffence_up1", "硬い皮膚", "1"],
  ["Deffence_down1", "うたれ弱い", "-1"],
  ["Deffence_down2", "すぐ骨折する", "-3"],
  ["Noukin", "脳筋", "2"],
  ["Rare", "希少", "3"],
  ["Legend", "伝説", "3"],
  ["PAL_ALLAttack_up2", "獰猛", "3"],
  ["PAL_ALLAttack_up1", "勇敢", "1"],
  ["PAL_ALLAttack_down1", "ビビり", "-1"],
  ["PAL_ALLAttack_down2", "ことなかれ主義", "-3"],
  ["PAL_rude", "粗暴", "1"],
  ["PAL_conceited", "うぬぼれ屋", "1"],
  ["PAL_sadist", "サディスト", "1"],
  ["PAL_masochist", "マゾヒスト", "1"],
  ["PAL_CorporateSlave", "社畜", "1"],
  ["PAL_oraora", "オラオラ系", "1"],
  ["TrainerATK_UP_1", "突撃指揮者", "3"],
  ["TrainerDEF_UP_1", "堅城の軍師", "3"],
  ["TrainerWorkSpeed_UP_1", "モチベーター", "3"],
  ["TrainerMining_up1", "鉱山のチーフ", "3"],
  ["TrainerLogging_up1", "伐採リーダー", "3"],
  ["ElementResist_Normal_1_PAL", "アブノーマル", "1"],
  ["ElementResist_Fire_1_PAL", "日焼け好き", "1"],
  ["ElementResist_Aqua_1_PAL", "防水加工", "1"],
  ["ElementResist_Thunder_1_PAL", "絶縁体", "1"],
  ["ElementResist_Leaf_1_PAL", "防草効果", "1"],
  ["ElementResist_Ice_1_PAL", "高温体質", "1"],
  ["ElementResist_Earth_1_PAL", "耐震構造", "1"],
  ["ElementResist_Dark_1_PAL", "陽キャラ", "1"],
  ["ElementResist_Dragon_1_PAL", "ドラゴンキラー", "1"],
  ["ElementBoost_Normal_1_PAL", "無の境地", "1"],
  ["ElementBoost_Fire_1_PAL", "火遊び好き", "1"],
  ["ElementBoost_Aqua_1_PAL", "水遊び好き", "1"],
  ["ElementBoost_Thunder_1_PAL", "コンデンサ", "1"],
  ["ElementBoost_Leaf_1_PAL", "草木の香り", "1"],
  ["ElementBoost_Ice_1_PAL", "冷血", "1"],
  ["ElementBoost_Earth_1_PAL", "大地の力", "1"],
  ["ElementBoost_Dark_1_PAL", "夜の帳", "1"],
  ["ElementBoost_Dragon_1_PAL", "竜の血族", "1"],
  ["PAL_FullStomach_Up_1", "食いしんぼ", "-1"],
  ["PAL_FullStomach_Up_2", "無限の胃袋", "-2"],
  ["PAL_FullStomach_Down_1", "小食", "1"],
  ["PAL_FullStomach_Down_2", "ダイエットマスター", "3"],
  ["PAL_Sanity_Up_1", "精神が不安定", "-1"],
  ["PAL_Sanity_Up_2", "破滅願望", "-2"],
  ["PAL_Sanity_Down_1", "ポジティブ思考", "1"],
  ["PAL_Sanity_Down_2", "ワーカーホリック", "3"],
  ["ElementBoost_Normal_2_PAL", "聖天", "3"],
  ["ElementBoost_Fire_2_PAL", "炎帝", "3"],
  ["ElementBoost_Aqua_2_PAL", "海皇", "3"],
  ["ElementBoost_Thunder_2_PAL", "雷帝", "3"],
  ["ElementBoost_Leaf_2_PAL", "精霊王", "3"],
  ["ElementBoost_Ice_2_PAL", "氷帝", "3"],
  ["ElementBoost_Earth_2_PAL", "地帝", "3"],
  ["ElementBoost_Dark_2_PAL", "冥王", "3"],
  ["ElementBoost_Dragon_2_PAL", "神龍", "3"],
  ["MoveSpeed_up_1", "すばしこい", "1"],
  ["MoveSpeed_up_2", "走るのが得意", "2"],
  ["MoveSpeed_up_3", "神速", "3"],
  ["HP_ACC_up1", "体力増加Lv1", "1"],
  ["HP_ACC_up2", "体力増加Lv2", "2"],
  ["HP_ACC_up3", "体力増加Lv3", "3"],
  ["Attack_ACC_up1", "攻撃増加Lv1", "1"],
  ["Attack_ACC_up2", "攻撃増加Lv2", "2"],
  ["Attack_ACC_up3", "攻撃増加Lv3", "3"],
  ["defense_ACC_up1", "防御増加Lv1", "1"],
  ["defense_ACC_up2", "防御増加Lv2", "2"],
  ["defense_ACC_up3", "防御増加Lv3", "3"],
  ["WorkSpeed_ACC_up1", "高速作業Lv1", "1"],
  ["WorkSpeed_ACC_up2", "高速作業Lv2", "2"],
  ["WorkSpeed_ACC_up3", "高速作業Lv3", "3"],
  ["TemperatureResist_Heat1", "耐暑Lv1", "1"],
  ["TemperatureResist_Heat2", "耐暑Lv2", "2"],
  ["TemperatureResist_Heat3", "耐暑Lv3", "3"],
  ["TemperatureResist_Cold1", "耐寒Lv1", "1"],
  ["TemperatureResist_Cold2", "耐寒Lv2", "2"],
  ["TemperatureResist_Cold3", "耐寒Lv3", "3"],
  ["MaxInventoryWeight_up", "最大所持重量増加Lv1", "3"],
  ["MaxInventoryWeight_up2", "最大所持重量増加Lv2", "-1"],
  ["MaxInventoryWeight_up3", "最大所持重量増加Lv3", "-1"],
  ["PAL_SpiritualInst", "精神が不安定", "-1"],
  ["ElementResist_Normal_1", "無属性ダメージ軽減Lv1", "1"],
  ["ElementResist_Fire_1", "炎属性ダメージ軽減Lv1", "1"],
  ["ElementResist_Aqua_1", "水属性ダメージ軽減Lv1", "1"],
  ["ElementResist_Thunder_1", "雷属性ダメージ軽減Lv1", "1"],
  ["ElementResist_Leaf_1", "草属性ダメージ軽減Lv1", "1"],
  ["ElementResist_Ice_1", "氷属性ダメージ軽減Lv1", "1"],
  ["ElementResist_Earth_1", "地属性ダメージ軽減Lv1", "1"],
  ["ElementResist_Dark_1", "闇属性ダメージ軽減Lv1", "1"],
  ["ElementResist_Dragon_1", "龍属性ダメージ軽減Lv1", "1"],
  ["ElementResist_Normal_2", "無属性ダメージ軽減Lv2", "2"],
  ["ElementResist_Fire_2", "炎属性ダメージ軽減Lv2", "2"],
  ["ElementResist_Aqua_2", "水属性ダメージ軽減Lv2", "2"],
  ["ElementResist_Thunder_2", "雷属性ダメージ軽減Lv2", "2"],
  ["ElementResist_Leaf_2", "草属性ダメージ軽減Lv2", "2"],
  ["ElementResist_Ice_2", "氷属性ダメージ軽減Lv2", "2"],
  ["ElementResist_Earth_2", "地属性ダメージ軽減Lv2", "2"],
  ["ElementResist_Dark_2", "闇属性ダメージ軽減Lv2", "2"],
  ["ElementResist_Dragon_2", "龍属性ダメージ軽減Lv2", "2"],
  ["ElementResist_Normal_3", "無属性ダメージ軽減Lv3", "3"],
  ["ElementResist_Fire_3", "炎属性ダメージ軽減Lv3", "3"],
  ["ElementResist_Aqua_3", "水属性ダメージ軽減Lv3", "3"],
  ["ElementResist_Thunder_3", "雷属性ダメージ軽減Lv3", "3"],
  ["ElementResist_Leaf_3", "草属性ダメージ軽減Lv3", "3"],
  ["ElementResist_Ice_3", "氷属性ダメージ軽減Lv3", "3"],
  ["ElementResist_Earth_3", "地属性ダメージ軽減Lv3", "3"],
  ["ElementResist_Dark_3", "闇属性ダメージ軽減Lv3", "3"],
  ["ElementResist_Dragon_3", "龍属性ダメージ軽減Lv3", "3"],
].reduce((acc, cur) => {
  acc[cur[0] || ""] = [cur[1], cur[2]];
  return acc;
}, {} as Record<string, [string, string]>);

export default data;
