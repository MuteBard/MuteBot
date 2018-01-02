DROP TABLE IF EXISTS abilities CASCADE;
CREATE TABLE abilities(
  id serial primary key,
  ability varchar,
  abilityi varchar,
);

DROP TABLE IF EXISTS brands CASCADE;
CREATE TABLE brands(
  id serial primary key,
  brand varchar,
  brandi varchar,
  pref varchar,
  unpref varchar,
);

DROP TABLE IF EXISTS gear CASCADE;
CREATE TABLE gear(
  id serial primary key,
--name
  gearname varchar,
--image links
  geari varchar,
--ability data
  main varchar,
  brand varchar,
--color
  color1 varchar,
  color2 varchar,
--owner
  annieshop boolean
--type
  denim boolean,
  leather boolean,
  jacket boolean,
  sweater boolean,
  t-shirt boolean,
  sleeves boolean,
  winter boolean,
  spring boolean,
  summer boolean,
  fall boolean,
--misc
  costig integer,
  costsn varchar,
  rarity integer,
);

INSERT INTO abilities VALUES
  (DEFAULT, "Ability Doubler", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Ability_Doubler_hu31sq.png"),
  (DEFAULT, "Bomb Defense Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Bomb_Defense_Up_bdujjq.png"),
  (DEFAULT, "Cold-Blooded", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Cold-Blooded_1_sl5emv.png"),
  (DEFAULT, "Comeback", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Comeback_iobj5i.png"),
  (DEFAULT, "Drop Roller", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Drop_Roller_ztgjrb.png"),
  (DEFAULT, "Haunt", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Haunt_xtgj9e.png"),
  (DEFAULT, "Ink Recovery Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Ink_Recovery_Up_gr8jri.png"),
  (DEFAULT, "Ink Resistance Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Ink_Resistance_Up_v7h9yl.png"),
  (DEFAULT, "Ink Saver (Main)	", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Ink_Saver__Main_zoigzf.png"),
  (DEFAULT, "Ink Saver (Sub)", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Ink_Saver__Sub_lh4f8f.png"),
  (DEFAULT, "Last-Ditch Effort", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Last-Ditch_Effort_udp4va.png"),
  (DEFAULT, "Ninja Squid", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924243/S2_Ability_Ninja_Squid_ds23xf.png"),
  (DEFAULT, "Object Shredder", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Object_Shredder_rrse8w.png"),
  (DEFAULT, "Opening Gambit", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Opening_Gambit_u70egr.png"),
  (DEFAULT, "Quick Respawn", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Quick_Respawn_c4j5sz.png"),
  (DEFAULT, "Quick Super Jump", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Quick_Super_Jump_ysmavo.png"),
  (DEFAULT, "Respawn Punisher", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Respawn_Punisher_vewrex.png"),
  (DEFAULT, "Run Speed Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Run_Speed_Up_fnqbon.png"),
  (DEFAULT, "Special Charge Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Special_Charge_Up_bykawt.png"),
  (DEFAULT, "Special Power Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Special_Power_Up_zyfb7r.png"),
  (DEFAULT, "Special Saver", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Special_Saver_n3rjaz.png"), 
  (DEFAULT, "Stealth Jump", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Stealth_Jump_pm0zbb.png"),
  (DEFAULT, "Sub Power Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Sub_Power_Up_yn2mbw.png"),
  (DEFAULT, "Swim Speed Up", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924244/S2_Ability_Swim_Speed_Up_cglwie.png"),
  (DEFAULT, "Tenacity", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924245/S2_Ability_Tenacity_zfaehx.png"),
  (DEFAULT, "Thermal Ink", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514924245/S2_Ability_Thermal_Ink_lmepuo.png");

INSERT INTO brands VALUES
  (DEFAULT, "amiibo", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_amiibo_zxtsfg.png", "none", "none"),
  (DEFAULT, "Annaki", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Annaki_wz8uds.png", " Cold-Blooded", "Special Saver"),
  (DEFAULT, "Cuttlegear", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Cuttlegear_qxcjxj.png", "none", "none"),
  (DEFAULT, "Enperry", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Enperry_xzsht4.png", "Sub Power Up", "Ink Resistance Up"),
  (DEFAULT, "Famitsu", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S_Brand_Famitsu_p1hfo0.png", "none", "none"),
  (DEFAULT, "Firefin", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Firefin_onnvea.png", "Ink Saver (Sub)", "Ink Recovery Up"),
  (DEFAULT, "Forge", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Forge_capaps.png", "Special Power Up", "Ink Saver (Sub)"),
  (DEFAULT, "Grizzco", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Grizzco_qsrbcn.png", "none", "none"),
  (DEFAULT, "Inkline", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Inkline_xyumc0.png", "Bomb Defense Up", "Cold-Blooded"),
  (DEFAULT, "KOG", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S_Brand_KOG_fxklue.png", "none", "none"),
  (DEFAULT, "Krak-On", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Krak-On_m5nsth.png", "Swim Speed Up", "Bomb Defense Up"),
  (DEFAULT, "Rockenberg", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Rockenberg_jrwiwx.png", "Run Speed Up", "Swim Speed Up"),
  (DEFAULT, "Skalop", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932214/S2_Brand_Skalop_tjjvui.png", "Quick Respawn", "Special Saver"),
  (DEFAULT, "Splash Mob", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Splash_Mob_yukqgb.png", "Ink Saver (Main)", "Run Speed Up"),
  (DEFAULT, "SquidForce", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_SquidForce_ze1fag.png", "Ink Resistance Up", "Ink Saver (Main)"),
  (DEFAULT, "Takoroka", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Takoroka_ycmnbl.png", "Special Charge Up", "Special Power Up"),
  (DEFAULT, "Tentatek", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Tentatek_tloods.png", "Ink Recovery Up", "Quick Super Jump"),
  (DEFAULT, "The SQUID GIRL", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Tentatek_tloods.png", "none", "none"),
  (DEFAULT, "Toni Kensa", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Toni_Kensa_eque1d.png", "Cold-Blooded", "Sub Power Up"),
  (DEFAULT, "Zekko", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Zekko_oskixp.png", "Special Saver", "Special Charge Up"),
  (DEFAULT, "Zink", "http://res.cloudinary.com/dtvznpuay/image/upload/v1514932215/S2_Brand_Zink_jthryx.png", "Quick Super Jump", "Quick Respawn"),


INSERT INTO gear VALUES
  (DEFAULT,
  "Acerola Rain Boots",
  "http://res.cloudinary.com/dtvznpuay/image/upload/v1514858160/S2_Gear_Shoes_Acerola_Rain_Boots_f4rbym.png",
  "Inkline", "Run Speed Up",
  "Red", "blue" ,600, 1500, 1),
