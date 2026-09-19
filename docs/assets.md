# 料理素材

Built-in image generationで作成。画像生成スキルを使用し、描画後にWebPへ圧縮。UIアイコンはLucide。アプリアイコンはシンプルな器のモチーフ。

## 給食

`public/food/lunch-1.webp`〜`lunch-4.webp`。各4×4セル。`lib/food-art.ts`の配列順に対応します。

プロンプト共通：gentle Japanese children's cookbook watercolor/gouache food illustrations, uniform warm ivory background, overhead three-quarter view, centered dishes at exact quarter-grid centers, generous margins, neutral ceramics, no text/UI/gridlines。

提供献立表の料理名をもとにした64点の汎用イラスト。料理ごとの材料や学校の盛りつけを厳密に再現するものではありません。ABCマカロニスープのパスタ形状はイメージ表現です。

## 夕食

`public/food/dinner-{beef,shabu,chicken,pork,nikujaga,tomato,curry,stew}.webp`。A4縦比率の料理写真。

共通プロンプト：portrait A4 ratio, natural luxury Japanese magazine feel, cream linen, white ceramics, soft daylight, simple accessible Japanese home dinner, generous negative space, main dish central, separate vegetable side and cooked rice, no lettering/numbers/UI。

各主菜・副菜は`lib/dinners.ts`に対応します。画像は盛りつけイメージで、生成による少量の飾りなどが入る場合があります。調理・買い物には画面の材料一覧と手順を使います。

プロンプト本文とレシピ図解はアプリ側で読みやすいテキストとして表示します。`recipePrompt()`は選んだ献立の全材料と手順を含む画像生成プロンプトを出力します。
