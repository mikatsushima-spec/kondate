# 料理素材

Built-in image generationで作成。画像生成スキルを使用し、描画後にWebPへ圧縮。UIアイコンはLucide。アプリアイコンはシンプルな器のモチーフ。

## 給食

表示用は `public/food/items/0.webp`〜`121.webp`（料理ごとの320×320画像）。`lib/food-art.ts`の配列順に対応します。旧 `lunch-1.webp`〜`lunch-4.webp` は最初の64点の元画像です。配置が均等ではないため、余白で切り分けて正方形に収めています。画面上で大きな画像の一部分を切り出す表示は使用しません。

プロンプト共通：gentle Japanese children's cookbook watercolor/gouache food illustrations, uniform warm ivory background, overhead three-quarter view, centered dishes at exact quarter-grid centers, generous margins, neutral ceramics, no text/UI/gridlines。

提供献立表の料理名をもとにしたイラスト（既存64点＋10月追加58点）。料理ごとの材料や学校の盛りつけを厳密に再現するものではありません。ABCマカロニスープのパスタ形状はイメージ表現です。

## 夕食

`public/food/dinner-{beef,shabu,chicken,pork,nikujaga,tomato,curry,stew}.webp`。A4縦比率の料理写真。

共通プロンプト：portrait A4 ratio, natural luxury Japanese magazine feel, cream linen, white ceramics, soft daylight, simple accessible Japanese home dinner, generous negative space, main dish central, separate vegetable side and cooked rice, no lettering/numbers/UI。

各主菜・副菜は`lib/dinners.ts`に対応します。画像は盛りつけイメージで、生成による少量の飾りなどが入る場合があります。調理・買い物には画面の材料一覧と手順を使います。

プロンプト本文とレシピ図解はアプリ側で読みやすいテキストとして表示します。`recipePrompt()`は選んだ献立の全材料と手順を含む画像生成プロンプトを出力します。

追加画像：dinner-mapo / dinner-saute / dinner-yakisuki.webp。アプリ用に生成した料理イメージで、参考レシピサイトの写真ではありません。

## 2026年10月の画像修正

Built-in imagegenで3枚の4列×5行の料理素材を生成し、最後の空欄2セルを除く58点を個別のWebPへ書き出しました。実際の料理間の余白を確認して切り分けています。画像はPDFからの切り抜きではなく、料理名から作成したイメージです。生成プロンプト全文は `docs/october-art-prompts.txt`。

保存済みの献立にイラストIDがなくても、表示時に料理名（ひらがな・カタカナ両対応）から参照します。利用者が選んだイラストや写真がある場合はそちらを優先します。未知の料理は従来どおりお皿で表示します。
