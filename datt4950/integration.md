
importance: 2

---

# Integrations

In the [labs](labs.html) we've been looking at systems in something like a clean environment, which made it easier to explore their properties, capacities, and constraints quickly and facilitate rapid prototyping and design. However ultimately you may want to translate these models into other software environments -- perhaps to leverage the increased performance of native C++ or GPU programming, or perhaps in order to integrate with other elements of interaction and display for the final work. I'll be exploring a few examples of this translation into different platforms here.

## Cellular systems using Max/MSP/Jitter's jit.gen or jit.gl.pix

There are a few ways to run CAs within Jitter (there's even a ```[jit.conway]``` object), but these days I would strongly recommend using ```jit.gen``` or ```jit.gl.pix``` over all other options. Use ```jit.gen``` if you want to work on jitter matrices (i.e. on the CPU) -- jit.gen will be significantly faster than patching things any other way. Use ```jit.gl.pix``` if you want to run the simulation on the GPU, purely using OpenGL textures -- this is probably the fastest option available if you have a decent graphics card.

> Note that you can also export jit.gen code as C++, and jit.gl.pix code as a GLSL fragment shader, so it is also possible (with a bit of glue) to prototype things in Max and then embed them in another application.

Here is the canonical Game of Life implemented in jit.gl.pix -- notice how we can run this at far higher resolutions and still get a good frame rate:

> Note, to open this in Max, select all the compressed patcher code below and copy it to the clipboard, then in Max choose File -> New from Clipboard.

<pre><code>
----------begin_max5_patcher----------
3180.3oc2ckzaiiiE9ryuBBeppoSkQbSKClpmEfFCFfAyk5vbnPi.YKZGVkr
jgjbpTci9+9vM4Hm3EpHZVx9hbDkD0688V3iO9DyueyjoyJehUOE7W.eFLYx
ueyjIpljMLwb9joqReZddZs51lNub0JVQyza0Wqg8Tip8pMEssU278blpw1V
J1rhWjyZTcAzz35JVsnmRa3kE2Wwl2nICHL3N5sfP3cA2BBLG.+5y8T4ll1t
JnsqRal+.uX4d5FjrGBU8CpaGwyTTX4ru7AbvTYa+wM2HOb6PABAW0zSnvZt
BCirkqPItjq9WoqXfxEf+CeACvK.eg2b2x76Vyep8VWTVzTy+ME2hH2EzODP
9zEh2g5N+GU7zbv+rLOC7uaRy4ym1WbBozdDfk3HFRU+fO.NE4RbZAOOGTOu
hwbj4.MvP8jgYOPnIp9IIV9SB7npNDmBILVFXV57uBDr3i7xM0fZAax.uKqb
yrbFX1lEKXUuu8Ay4Er4kaJTOM1IfHIVw0H7.cpPHJMJTTzyfnro8BhXWBhM
UeGTwRyy+NXFeIP19lJlno5x7MRts9VPN+qL.IHI7I4g8BmnykeITn1fCq9I
L4nVbn2BxTv9l3geEvHj3qYEYBeR7g40EdjwRhzlKPESp4QDpCyo6lluuloe
foS2KeG3P9tAD.lAfChkwGwAJV41ApU3IjSyxboVKX5rzhkxekmtOP.F+V.g
lxkKE724U9BiU7rVUVd73L6d4tnoaeMUhgyZXU2yJRmoI2f2.mOaSSSYw4hy
MhYc7DQz1iGlwUh28x4DGpbKitnnjWy.Pvh7xzFLB.CPD0gAgEnifEDUrUFq
bnN.ziqyKny6Wk1TIiB5.F8PjiwEQTWFu+mKf.SCU.QnZPyHjc3vx762RWGB
KfiOaecjh1a.bHK+XWa3ebUfG4Yrx04oELveuoJsndQY0p6Uy8.fNyVHlXHQ
AXmXgfcrAx2JqxyNaiK1MR.pEtH5Nl39iJv89G5LqrSv+n2pJPfxfgRbmugo
ceorJCya39IxIVwdjUUKB0sifaxzz0q6z7jNOhDx9RopihtcaS7BcSvsMImT
R6yGrs0zJAq2H3aIQKIxmhaCoV1MkYrphMbUOoaTH7tosCaQqP8fHQI53FU+
DJmKRKBLYJKi2Hg3YKmWlqIsOKlbRxscN.69.yVlWN+qrrtj6zRQLv7hty9Y
mKmwVjtIu49tyQGhtauWeQ5b1Ae3cmhdKdLcYEOqrPRD6HajM295DQYoinj1
kYT2QQ5587vBkBANdfKJm.4l5YoURQmwIKp8hMkk46dosOWNaQi4xq4EEu.E
aJWe3KVwW9vQd1YkhKt5X8s5J02uoPe06EFyM2Wm93tnciXNdFq6c69mRK3B
OorFtVDfB1dQ8.MOTOupLOeG9UekG2yUxDZ8yYeim07f5E0UYPb670sJQS2J
ky3KY0M61VS5x5ca4UdbDMsYlwpV3FXkXTqlWbC6jExtlvc8CtS6GcZy65TL
MKCz7.aEPfrfMqAMkfkhQIEMAJXBg5rxpGJKE2SYyypzGZlyGfEOz.KGMoDQ
pvrHnD4OuLoDGd92GL4DZ2LDTr1NC+x4f+RWtI5LDNoc3GiWr2nHXmgj1UB7
S.gS2UScNBRSBzYc.suz5b33.ODBRSvcxhAI9kCtch45+J7M55.eSHNEdSnt
Aciu3QWSlccq1KF6HsW50A9hntU8EQcj9a3EN9RBB5nuMb7kD3V8W70A9Zz2
bF95L8WxEO9hzI5Kzo3KTm1rgiunKE78sfR5HKFNHA8DH8m.Pv1bT3KPRu.+
5zFL.PJ1WQJwdZcE.9my38UaJ3MCTgZaNEPEFMTfxoArer4jJfH.uVMGTYBR
jUVg7uMII6VPcoFGAK4OxL2WCas9lmwZ9FiU.VyehkWKqFCoAbZt3ZYf4kkU
Y7BwTrqAuKMWzQofGYyQu+fyrk5bOqHsf.GXoi0SLw1c5NHUupDjCOu1XpuD
iRbuUNtWYPqfc9lpJQmnEYxLPHyS+6LRFvAEMX2KZLqSuSEMlg7LhltEDwqD
MDeIZdNU3Bwwp0aZLlQOlluQ7mB4R51pnPKUl8c8e3SogQy1s1IZYQvIkEXe
IKpSWsNWVrJoY0fEUkqDRBoUiA920A16Bt6N3665Gy6BjP2Zc.Q1Zcf7kDgW
.k9sVTVIjJePV6LbI7qW4.mip5DSRihcCrFC0cWTGEcTvQfUnufUAO.2Ndfn
QgxtbASbNfFqRoAMF4R.MTGnoM.Zf+zSQs341hGTgoxAOM9Od+4Hm8uA67nt
v2wx6dThufuJ1LdUyCmgbqoCFijfcyZWPiUKBBEq9QqdeLMvHuEhWdYASpTU
WeKn7QV07pxuIFWZ4ObkNBUuD7cgrip04sPu3hXqxEyaAHFcISLluGWSMDQW
XFgD23YDin55bvLjyIAYu4YTNAB431xIS7arpR4uUaJLSob0Ob0ScoVSCTi4
GGdJfKzWqE4eqmNCwu0TSnAfv.cAzFLvTSDFc8gOAZaJc41pq8tgfP9Z8T9Y
gKEpuxDnAkLe.C3gluzPesnde7i.ruvHpNC9sXzfUj70BajVj0SHB8lySpVy
gB0kfV3PgHes1Z+UOpFQhoNUMxWqeyO+wsU764GivwNEi70x27S9yPK7tH51
pvRWaWCAgB71Bb8AHHvatrM0RQRnSVgKhuPIclLGfxzglOMjz4SU0A0pho+z
UFGYv3qu7kwK5sur.qQWTDwsnqNDe7Pism3sDw++NCYBRuTR1q4dpLAY5Ord
t1mLSPDh2bPF.f91+HJvIiyRnWG9GQ5QJblErY7mg6eL5Zv+HLI1snqtRyFt
+wXe4e7+d17OZulqc9GQ5urHK7Ol3wJjx2wOBwgNw+H8JI9QH0swOhftI9Q5
UQ7iPnaiezrsCLX+iTuE+3ub17OZulqc9GgQVF+H0mwO9AeG.oipfT5UR7iQ
tM7QyvOC283UQ3iX2F8XhaBdj5sfG+zYy4XjaicDFXYrizDel7QeWc8tJ4i3
K8fGwlrL3pvav5RP0UIeDeYG7nAcQQX2htNJ4iXuE73mNCYeDqqd.6UcOUUq
DQ6U1GwDe5gz6e.Rl7ORvCUIidc3hD4pXbLFwtJ+i3nqAWjvjH2htNJ+iX+k
+wymKR6UcsyEo0IfD6yDP5aGjtJAjnKdGjPS0u61XHcUBHQW3NHMnKzswP5p
DPh7mCxe4b3fj1OUW6bPZcFHQIWG19QgtU4zQIWCguFL8wTmBtNJ4ZHu8Mk7
oeYpu9vELlu1ljL3Eu4aDVuc+BcjJloj0082fseggW11us6JEQtEcwtwBF5q
.iTaKx5uXo.es6fX9FjHGXa6uuPE0eJhPusAp.Ue2klXUFr1jmPHAE4vo5Y0
WxVnd9y38uGyzsfa1GF77Ndq5aIc+a0op2s756GbpK2TMuUDX1gyDNS1gNxX
0MxMMAyd25m2lAcw.Z6biOvyxXEuj6y30x8K1rs6Y4mTT1WZFGXIMuGl6GEM
mPrEmiFO3L0VblLdvYaoYx3QelXs9Lc7fyg1hyiG8Yh05ygiGbNxRZlNdzmo
VqOGMdv4Xaw4wi9L0Z843wCNirjlQiGbFYMNiFO3LzVbFOZv4XasA2Cy8Cil
s0+7dFje+z7Jd15RdQSc6NxORkYk3X0+zNCd9rceoiHNkNLN07Oc0fmOarxo
zgISgnnNbp5rwJmhGp1qhSIvmOazxoCT6MHoKmJOarxoH5.0doc3T0YiV6zg
wo57aYLSkmLV4y3XGvmFA5O.9DZabVgim4MDF1GZFMNnYqGIez.yv9fxiinY
CsMieJUnQhlAtOz7HAmsMaCgiG04PZev4QhIn0d5FOYozdcCzEHMOdlEbnsY
0Ib7jsgPXen4wANSrFmCFOYcO5xiloWf3L8BDmQ39PyiCaPTzkGMiuDoYzkG
MS60pHMRnYbeVgwQx3f39rJ+iDZNtOqX9HwFLtOUsxHgl6UEMMRFSItOqJ5H
glI8YEFGIyg01wAgtZd2fe8lmaQczTHe6VDeJh9UrilU1Caril6gXgctmWQ8
ulxMT2s8mbh6FP4gHGj2nGTv3BdhrfbdAMe1EWnSAOQ9kdBFQzCwF5I1eziM
jyoTmewJ9fZ+2PBQ+g.nJtfcOq8iy0rQuKO6YhvcLGzRaUnebcXimLuI4swv
.MpzCwuQpQOjX550OxppMcohPltJ8KkUxSitUcJuPeppT7mJ++4U68qdGSSq
l+.ugMW9e0KU8z+Tb3T8iVlwpJ1vUO8Mx27eby+mJx5n0
-----------end_max5_patcher-----------
</code></pre>

And here's a version that works over jitter matrices (rather than jitter textures) -- this is useful if you want to keep all the work on the CPU rather than on the GPU:

<pre><code>
----------begin_max5_patcher----------
2521.3oc4cszbihqEdsyuBUd6jjB8BvS0cOyrX1d2L2plE8LUJrQ1ltwHWfH
I8cp4+9UO.Gv1XDwAGkxKhSgDBNmOcdi.8O2LY5b9yrhofeF7UvjI+yMSlna
R0vjpimLcSzyKRiJzm1zE7MaXYho2Z5SvdVna+SeBjx4eGjjAVyxY08mljwV
vKyzmDppwrxM7RQJSnujdUstMmUHuxQhDd1C4rEBCYglQt26V.hfT+yq5Gve
WOpHwh0IYqZLBnWndDgAp+4qGNF2XLIwZRlO+a2g7pozBwORY51m9BYljUSk
PUa+6M2n941yDqJKjDL3aIh62DIxSdF7ThXMPrlAJh1v.YpeVjyhDrBPDXIi
EOOZw2U361ihqguFbEFN6dpBWIViqyflYB7K3JDRNNvBmMh.aF6I483.bUgn
7sfeU92W.+5iQoRNhN8nfSsnnoIwO1xL7n5Z7fYVY5sRJ9T3gOUi.AZTAh70
fCpC3HzR3.8JfCEeu8ojrX9SCjasjGw9ZMJXn+NN9nLIbrmg2vD4b.h5cb9D
1EeNOJa0I4SD1HNimoksomZtLXDmJOgjckshZyAisbckZNzK3TXg+6iV9EFK
vHpEXA88AKVwxFcYAiqTiDQWrOwV1u4cikWwzUb8joKSRYOxxKjdqZb1SlFs
cailmzXHJn5ab8EJ31cMkjYZBsqob1iI0i2aWqQ4RdVHY3xbCQ+bXsPs5xvi
Y4YkI6l2zSZ2TeAqgIJUiSAZqGA9FiHJPqFnlLkEmHTX67UK3oFR6qR+Syts
wOvlCX9pT9huyhaRtS4aYYIYMco2p6X1xnxTwCK4Yhhj+mlgfp.mNR+KiVv5
bvpXPznwukmDkViGSWkmDyyTDQq4FUy02NYbBFkEZSlQeFYQaOxfkxNRbriN
KjLYYw7nb0T2biXU8L5TAmm1tqciKksTT081jrr8PQAea2clmrZ8IF6btryM
m5Zq6o3gxLSuOHUhEOTD8XazVDklVoU29x+bTVhT6jIRLSAHuccxxhjL55hE
47zzV7qomGOROwRo9ErmRhEq02nlBCxSOYasPzzcyxwIqXEh1sIhVUztkCTy
kMUNuRq9AAay1TIWz9DZktQSU3l1+Z09orC11V3WZDsW2wFzQbP6jT6J12Ps
PMEpCDBGtugvCLFBaRIGBUG2ovjZGCU1YdkfT67NZiRqXBvBVZJPFdbIqa3x
qIdb7LH7qB.1Dyz9YPzERRCMwRRLgMS0iC40MTh7cTnbC+QFPvAYLoEi47xb
MvddPJ0fJd9uFH0CaKjhbbHcg7DX4.9xyGRoXMVRQCAQITsLM0Z.0UU2WTlm
K6ynxufyyiSxTVksCQ6DXPHaAFu2Qf4DNKNsXErewJhw3mbluS4pg6kAOy+E
zEMqOmLvgZYz6x.tEQRe+rspzKFUuwjYdGOa8C.pgZuCcgTOihiU08aCPFLH
nbqxzmxAspTfUdUxWy4xygKhZIudr5p9Jzl8zRZDTfQcFueoR2GHmMyMUm+I
.DbGbrD2vFWHU9WMEh9ThaggtJJIiPdLiRtx9kQNh1aPxgANpWypxp.dhm+8
Biuy4+v7+6tSqcVklCHoPe3eIcSvWkGs4ulpCeguYaofUoG+byHtuG7eWKGT
0oqFedYFPF1SNfEsXs4Lkw8DALUn49N058esZ8nvCbg2pTE6OKgczYoctY.4
rn3Bvxb9FMjWUcvjr8C6o3s2DpALgXp5go.Mx7mxBZnqF5sjkg0hyZY1k4pZ
.cd3heE7zefhgdNJtjjsCV1ppfHur3MAZHz.KglfYNJzjylmjKV+pABJDozZ
n3P0+BI8BDTGEHR4YLk4jhha0lxWjyeRZwY0au4FbfoNTMgrSYtIf3ppURWb
oIxr844fXo46QvxLQqmQIljD75EpbzTU+kwJZMD1DmlQjBEzaZT9CMeS7kAg
97mA3wBjHg5zvIlm.FteLh3lRQQYwiVT+9vF0F22uWHB+NlM9IfnOMlhQl0j
j8hQH2TL5KeFfFY4H6wHnill8nAPzY2GP2UuFjYAbcJDxyM0z9IvcPf2XAST
yRwBadtT8WtFhi53ezKiJwjIBNHvtxnRPto3jLQe3XiQFwHrWuXD9crl7mJf
6+70+LepRynBB5MMMBwYK+43ImTYzA4isbABPuxM53AsznSvUqQmZgo9M5D5
nFc9OmqQGjIcBKL53vOYpwNRGnYcG1uQG5UdjNHnkQ5PudizoVXpWiNTWMRm
e+bM5.CsLRGpCGoycicnNV+3voW4g5TsTGsvpy0anNUBSVX0wUC04ONaqNdV
FpC0YC04NHXrWDNVWUG70ZrNHbvfppC9JLVmZLBGZmUGrqFqye7mmwxPX1fJ
qCl3vlcF8E+WUt3jde5VX5UtcGaKrCN3p0tCpZ0HzucGmsvNmscGqqrC1gqr
ynujissxNnqbqNVWYGz0qUGXfucVcPNqUme+bs5XcocPyttUnrtnEH70qBkm
ktwQDWM8gyWgx1pV.cTEpwTNo98TiFXmbBLvMeg9jb9o.IOqPA+5UaRuOMy2
.AkW9xSnWW1G+SNflVU8ebzofWlundtt9k5GzlriYEB0qVR02Pgu9xBkcuSb
cRbLKaezJNoP8caH194xgRyGgTNNMSbFRV81ZZGICcGZNvRZ9HL26FMaqnQX
fyPyg1hyp2ASqn4MIwa4IYhh5EpKs5Mqfp7ps6f12R2gOUI9cF7IzOrAipOx
U4T74woHJpAmpOxY4TuyhSwx.MdgS0G4pbJ4b4Tn4EH6kibVN8bkdwM3T8Qt
JmROu4TXfWCNUejyxoz2.eLUL56fOli35nCeLJ.A5D9+w1RyXGhl8rklQNCM
SrklINDMaqrAwcjMn1hyT2Amo1hyT2AmOR5.cXqC6N3rs9gTulWtBMGNDYC2
HmRJ5CHNiGhcC2.mIe.kmIgCwmhifye.kmI3gDugafy3AgyNBMiGRrnNBMG7
ADmCGRdJtAMi9.hynvgjCqiPy3Of3LYHwO6HO5KxPdbcH2flwCglcCe291lC
qu67LFsmlQe.oY244h5acLRtSd29vgPyuE3L3uu4kVdi1jwxK6Xagwq6c6EL
x7TFPu7ESq4R54nudMWxMNM0mhawf4JHIvVtBMl6ZYyKEBd1a8NWkYE5YXNy
mvs.ZGaOWj2mMnnLdRASpauLkGIvH.zGr6KW93ssrYdOwfUKLst1V1PiHjH3
qVkxF37ch5qdX+aTY1LeuaKmaaj56Upfk+fYahoo9x.3a88n85ox.C6afsBL
5Yg8z0BjoUD8GZP8PioGLsXM8DZA83ewHGanlfKF0D3TXCwBpgdwnFpMxwvK
F43aA4PtbZU1LWsmo.6oGiQn81L3TjxdaBb6sAvc3l+V2a7a6uouIuy+6M+e
.sKPlF.
-----------end_max5_patcher-----------
</code></pre>


[Some more examples by Jer Stewart here](http://jerstewart.com/software.html)

## Evolutionary audio in Max/MSP using gen~

The ```[gen~]``` object is similar to jit.gen in that it lets you define algorithms that are dynamically compiled to native code; however the gen~ patcher's job is to calculate the next audio sample. It allows you to get quite low-level with signal processing without leaving the patching world, nor losing efficiency. Also like jit.gen, all the patching in gen~ has an equivalent code representation, which you can view by opening the "C" tab at the side. So you can mix visual and text-based algorithms. 

Moreover, we can also send strings of this textual code to a gen~, and it will load them & run. That means we can explore meta-programming new audio algorithms! And, since Max has support for JavaScript, we can re-use a lot of our evolutionary programming code in Max. 

[You can grab an example of this from here](../code/gen~.fastbreeder.zip)

This example is similar to Dave Griffiths' [Fastbreeder](http://www.pawfal.org/Software/fastbreeder/), which applies GP to audio signals. 

> **Important note**: it is entirely possible generate some quite damaging audio signals when creating randomized signal graphs. For example, ```1000*sin(time)``` will blow up speakers if no limiting is applied. Before listening to any of these signals, make sure they are being passed through some operation that will limit their range between -1 and 1, such as using sine(), tanh(), some sigmoid function, or at the very least, clipping/wrapping.

[For more info on gen~, take a look at some tutorial information here](../gen/index.html)





