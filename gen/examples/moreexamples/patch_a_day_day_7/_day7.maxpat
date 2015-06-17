{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 6,
			"minor" : 0,
			"revision" : 4
		}
,
		"rect" : [ 21.0, 61.0, 1312.0, 520.0 ],
		"bglocked" : 0,
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 0,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 0,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"boxes" : [ 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-45",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 4626.390625, 1478.705078, 85.0, 20.0 ],
					"text" : "loadmess 100"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-43",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4642.890625, 1516.049561, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 931.536011, 267.647919, 40.0, 20.0 ],
					"text" : "bpm",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
					"border" : 0,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"hint" : "",
					"id" : "obj-60",
					"ignoreclick" : 1,
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 4721.266113, 1631.839844, 20.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1259.395386, 232.240326, 20.0, 20.0 ],
					"rounded" : 60.0,
					"text" : "2",
					"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ],
					"textovercolor" : [ 0.2, 0.2, 0.2, 1.0 ],
					"varname" : "textbutton[1]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
					"border" : 0,
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"hint" : "",
					"id" : "obj-59",
					"ignoreclick" : 1,
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 4701.266113, 1624.05249, 20.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1259.395386, 448.87561, 20.0, 20.0 ],
					"rounded" : 60.0,
					"text" : "1",
					"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ],
					"textovercolor" : [ 0.2, 0.2, 0.2, 1.0 ],
					"varname" : "textbutton"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-58",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 4861.909668, 1928.571533, 45.0, 20.0 ],
					"text" : "cycle~"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-56",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 4864.909668, 2075.571533, 32.5, 20.0 ],
					"text" : "*"
				}

			}
, 			{
				"box" : 				{
					"bubble" : 1,
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-55",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1720.328613, 167.858398, 150.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1192.94873, 457.447144, 74.0, 24.0 ],
					"text" : "start dsp"
				}

			}
, 			{
				"box" : 				{
					"bubble" : 1,
					"bubblepoint" : 0.8,
					"bubbleside" : 2,
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-54",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4501.227051, 1537.551025, 87.0, 39.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1192.94873, 249.429474, 87.0, 39.0 ],
					"text" : "start transport"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-52",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "int", "int" ],
					"patching_rect" : [ 2739.452148, 1961.700684, 57.0, 20.0 ],
					"text" : "stripnote"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.164706, 0.172549, 0.168627, 1.0 ],
					"annotation" : "step duration",
					"bordercolor" : [ 0.117647, 0.117647, 0.12549, 1.0 ],
					"focusbordercolor" : [ 0.215686, 0.254902, 0.25098, 1.0 ],
					"fontname" : "Helvetica",
					"fontsize" : 13.0,
					"id" : "obj-530",
					"maxclass" : "live.menu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 102.345886, 235.069031, 73.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 929.125488, 329.647919, 64.821045, 16.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "1nd", "1n", "1nt", "2nd", "2n", "2nt", "4nd", "4n", "4nt", "8nd", "8n", "8nt", "16nd", "16n", "16nt", "32nd", "32n", "32nt", "64nd", "64n", "128nd", "128n" ],
							"parameter_initial" : [ 13 ],
							"parameter_type" : 2,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "step.duration",
							"parameter_longname" : "step.duration[3]"
						}

					}
,
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "stepduration[1]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-47",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "int", "int" ],
					"patching_rect" : [ 2739.452148, 1921.594238, 46.0, 20.0 ],
					"text" : "notein"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-48",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 2700.952148, 1780.614258, 64.0, 21.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-50",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 2664.952148, 1815.614258, 55.0, 21.0 ],
					"text" : "midiinfo"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.164706, 0.172549, 0.168627, 1.0 ],
					"fontname" : "Helvetica",
					"fontsize" : 13.0,
					"framecolor" : [ 0.117647, 0.117647, 0.12549, 1.0 ],
					"id" : "obj-51",
					"items" : [ "IAC Driver Bus 1", ",", "828mk3 input", ",", "828mk3 Sync Port", ",", "to Max 1", ",", "to Max 2" ],
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 2664.952148, 1877.114258, 168.0, 19.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1021.655762, 282.773956, 135.0, 19.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "umenu"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Helvetica",
					"fontsize" : 12.0,
					"frgb" : [ 0.72549, 0.733333, 0.607843, 1.0 ],
					"id" : "obj-462",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4736.996582, 1555.049561, 44.0, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1202.893433, 289.773956, 44.0, 18.0 ],
					"text" : "bpm",
					"textcolor" : [ 0.72549, 0.733333, 0.607843, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Helvetica",
					"fontsize" : 30.0,
					"hbgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-457",
					"maxclass" : "number",
					"maximum" : 400,
					"minimum" : 20,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 4626.390625, 1539.051025, 92.0, 36.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 931.536011, 289.773956, 68.0, 36.0 ],
					"textcolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"tricolor" : [ 0.454435, 0.459252, 0.380949, 1.0 ],
					"varname" : "number[7]"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.164706, 0.172549, 0.168627, 1.0 ],
					"activebgoncolor" : [ 0.364409, 0.890907, 0.948841, 1.0 ],
					"bgoncolor" : [ 0.215686, 0.254902, 0.25098, 1.0 ],
					"bordercolor" : [ 0.106973, 0.10802, 0.089741, 1.0 ],
					"focusbordercolor" : [ 0.106973, 0.10802, 0.089741, 1.0 ],
					"id" : "obj-42",
					"maxclass" : "live.toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 4569.390137, 1605.05249, 31.0, 31.5 ],
					"presentation" : 1,
					"presentation_rect" : [ 1250.484985, 278.773956, 16.170799, 27.406204 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "off", "on" ],
							"parameter_mmax" : 1.0,
							"parameter_type" : 2,
							"parameter_shortname" : "live.toggle",
							"parameter_longname" : "live.toggle"
						}

					}
,
					"varname" : "live.toggle"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-460",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 4626.390625, 1624.05249, 61.0, 18.0 ],
					"text" : "tempo $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-454",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 9,
					"outlettype" : [ "int", "int", "float", "float", "float", "", "int", "float", "" ],
					"patching_rect" : [ 4626.390625, 1681.956055, 127.0, 20.0 ],
					"text" : "transport"
				}

			}
, 			{
				"box" : 				{
					"bubble" : 1,
					"fontname" : "Arial",
					"fontsize" : 20.0,
					"id" : "obj-40",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4071.51416, 2501.453613, 110.0, 33.0 ],
					"text" : "FM synth"
				}

			}
, 			{
				"box" : 				{
					"bubble" : 1,
					"fontname" : "Arial",
					"fontsize" : 20.0,
					"id" : "obj-37",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 3314.166748, 2496.138916, 148.0, 33.0 ],
					"text" : "adsr genrator"
				}

			}
, 			{
				"box" : 				{
					"bubble" : 1,
					"fontname" : "Arial",
					"fontsize" : 20.0,
					"id" : "obj-31",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 170.154724, 655.694214, 266.608337, 79.0 ],
					"text" : "ADSR generator modified from gregory's 7 segment example"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-29",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 81.345886, 606.151245, 122.0, 20.0 ],
					"text" : "r envelope_message"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-27",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 883.304688, 1363.488525, 124.0, 20.0 ],
					"text" : "s envelope_message"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-25",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1355.424316, 1363.488525, 124.0, 20.0 ],
					"text" : "s envelope_message"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-22",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 863.805542, 1926.660889, 124.0, 20.0 ],
					"text" : "s envelope_message"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-21",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1929.585571, 1416.724365, 124.0, 20.0 ],
					"text" : "s envelope_message"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-18",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 2359.922119, 1352.598633, 124.0, 20.0 ],
					"text" : "s envelope_message"
				}

			}
, 			{
				"box" : 				{
					"channels" : 1,
					"coldcolor" : [ 0.364409, 0.890907, 0.948841, 1.0 ],
					"fontsize" : 13.0,
					"hotcolor" : [ 0.364409, 0.890907, 0.948841, 1.0 ],
					"id" : "obj-1",
					"maxclass" : "live.gain~",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "signal", "", "float", "list" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 3530.666748, 2603.103027, 43.0, 136.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1096.850342, 389.37561, 40.0, 97.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_unitstyle" : 4,
							"parameter_mmax" : 6.0,
							"parameter_mmin" : -70.0,
							"parameter_initial" : [ -70 ],
							"parameter_type" : 0,
							"parameter_initial_enable" : 1,
							"parameter_shortname" : "live.gain~",
							"parameter_longname" : "live.gain~"
						}

					}
,
					"showname" : 0,
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"tricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"trioncolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "live.gain~",
					"warmcolor" : [ 0.364409, 0.890907, 0.948841, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-357",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1086.969482, 381.87561, 59.761597, 104.071518 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Helvetica",
					"fontsize" : 18.0,
					"frgb" : [ 1.0, 1.0, 1.0, 0.76 ],
					"id" : "obj-3",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 86.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 37.796753, 24.124771, 86.0, 24.0 ],
					"text" : "genone",
					"textcolor" : [ 1.0, 1.0, 1.0, 0.76 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0895, 0.089517, 0.089496, 1.0 ],
					"bordercolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"grad1" : [ 0.242226, 0.242226, 0.242226, 1.0 ],
					"grad2" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-5",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 134.0, 88.999939 ],
					"presentation" : 1,
					"presentation_rect" : [ 10.426758, 16.849686, 1272.968506, 39.275085 ],
					"rounded" : 0
				}

			}
, 			{
				"box" : 				{
					"active1" : [ 0.364409, 0.890907, 0.948841, 1.0 ],
					"bgcolor" : [ 0.941176, 0.941176, 0.941176, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"id" : "obj-367",
					"maxclass" : "preset",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "preset", "int", "preset", "int" ],
					"patching_rect" : [ 4609.345703, 1900.706299, 100.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1162.223145, 381.87561, 115.0, 66.0 ],
					"preset_data" : [ 						{
							"number" : 1,
							"data" : [ 5, "obj-9", "toggle", "int", 1, 5, "obj-28", "flonum", "float", 97.998856, 5, "obj-64", "multislider", "list", 0.227761, 5, "obj-62", "kslider", "int", 43, 5, "obj-125", "multislider", "list", 0.267488, 5, "obj-234", "number", "int", 0, 5, "obj-233", "multislider", "list", 0.0, 5, "obj-259", "flonum", "float", 9.0, 5, "obj-258", "flonum", "float", 8.0, 5, "obj-249", "number", "int", 0, 5, "obj-247", "multislider", "list", 0.0, 5, "obj-271", "flonum", "float", 72.0, 5, "obj-270", "flonum", "float", 71.0, 5, "obj-262", "multislider", "list", 0.0, 5, "obj-299", "flonum", "float", 227.0, 5, "obj-298", "flonum", "float", 143.0, 5, "obj-291", "number", "int", 158, 5, "obj-290", "multislider", "list", 0.52951, 5, "obj-303", "number", "int", 46, 5, "obj-302", "multislider", "list", 0.131678, 5, "obj-356", "flonum", "float", 1.0, 8, "obj-10", "multislider", "list", 0.0, 0.0, 0.0, 0.0, 5, "obj-230", "flonum", "float", 2.0, 8, "obj-34", "multislider", "list", 0.0, 0.0, 0.0, 0.0, 8, "obj-182", "multislider", "list", 0.0, 0.0, 0.0, 0.0, 8, "obj-133", "multislider", "list", 0.0, 0.0, 0.0, 0.648649, 8, "obj-225", "multislider", "list", 0.905405, 0.0, 0.0, 0.0, 8, "obj-189", "multislider", "list", 0.0, 0.216216, 0.0, 0.0, 5, "obj-240", "number", "int", 0, 5, "obj-236", "flonum", "float", 1.0, 5, "obj-459", "flonum", "float", 1.0, 5, "obj-494", "flonum", "float", 1.0, 5, "obj-317", "flonum", "float", 2.0, 5, "obj-36", "number", "int", 155, 5, "obj-323", "flonum", "float", 44.193138, 5, "obj-329", "flonum", "float", 9.0, 5, "obj-330", "flonum", "float", 15.9255, 5, "obj-338", "number", "int", 15, 5, "obj-337", "multislider", "list", 0.216994, 5, "obj-336", "flonum", "float", -0.1, 8, "obj-343", "multislider", "list", 0.0, 0.0, 0.943396, 0.0, 5, "obj-358", "flonum", "float", 3.937918, 5, "obj-1", "live.gain~", "float", -17.305992, 5, "obj-42", "live.toggle", "float", 1.0, 5, "obj-457", "number", "int", 108, 5, "obj-51", "umenu", "int", 1, 5, "obj-530", "live.menu", "float", 10.0 ]
						}
, 						{
							"number" : 2,
							"data" : [ 5, "obj-9", "toggle", "int", 1, 5, "obj-28", "flonum", "float", 82.406891, 5, "obj-1", "live.gain~", "float", -21.783077, 5, "<invalid>", "multislider", "list", 0.0, 5, "obj-64", "multislider", "list", 0.41, 5, "obj-62", "kslider", "int", 40, 5, "obj-125", "multislider", "list", 0.621599, 5, "obj-234", "number", "int", 74, 5, "obj-233", "multislider", "list", 0.292639, 5, "obj-259", "flonum", "float", 91.0, 5, "obj-258", "flonum", "float", 22.0, 5, "obj-249", "number", "int", 208, 5, "obj-247", "multislider", "list", 0.329389, 5, "obj-271", "flonum", "float", 40.0, 5, "obj-270", "flonum", "float", 12.0, 5, "obj-262", "multislider", "list", 0.787004, 5, "obj-299", "flonum", "float", 472.0, 5, "obj-298", "flonum", "float", 377.0, 5, "obj-291", "number", "int", 99, 5, "obj-290", "multislider", "list", 0.968019, 5, "obj-303", "number", "int", 55, 5, "obj-302", "multislider", "list", 0.678796, 5, "obj-356", "flonum", "float", 1.1, 8, "obj-10", "multislider", "list", 0.513514, 0.0, 0.0, 0.0, 5, "obj-230", "flonum", "float", 23.0, 8, "obj-34", "multislider", "list", 0.0, 0.337838, 0.067568, 0.0, 8, "obj-182", "multislider", "list", 0.675676, 0.418919, 0.0, 0.0, 8, "obj-133", "multislider", "list", 0.783784, 0.243243, 0.0, 0.310811, 8, "obj-225", "multislider", "list", 0.378378, 0.378378, 0.554054, 0.0, 8, "obj-189", "multislider", "list", 0.554054, 0.378378, 0.0, 0.0, 5, "obj-240", "number", "int", 36, 5, "obj-236", "flonum", "float", 1.0, 5, "obj-459", "flonum", "float", 1.0, 5, "obj-494", "flonum", "float", 1.0, 5, "obj-317", "flonum", "float", 238.0, 5, "obj-36", "number", "int", 555, 5, "obj-323", "flonum", "float", 583.365784, 5, "obj-329", "flonum", "float", 30.0, 5, "obj-330", "flonum", "float", 67.654999, 5, "obj-338", "number", "int", 15, 5, "obj-337", "multislider", "list", 1.0, 5, "obj-336", "flonum", "float", 0.0, 8, "obj-343", "multislider", "list", 0.490566, 0.773585, 0.0, 0.339623, 5, "obj-358", "flonum", "float", 19.710701 ]
						}
, 						{
							"number" : 3,
							"data" : [ 5, "obj-9", "toggle", "int", 1, 5, "obj-28", "flonum", "float", 82.406891, 5, "obj-1", "live.gain~", "float", -21.783077, 5, "<invalid>", "multislider", "list", 0.0, 5, "obj-64", "multislider", "list", 0.27, 5, "obj-62", "kslider", "int", 40, 5, "obj-125", "multislider", "list", 0.383379, 5, "obj-234", "number", "int", 74, 5, "obj-233", "multislider", "list", 0.007176, 5, "obj-259", "flonum", "float", 91.0, 5, "obj-258", "flonum", "float", 22.0, 5, "obj-249", "number", "int", 208, 5, "obj-247", "multislider", "list", 0.330683, 5, "obj-271", "flonum", "float", 27.0, 5, "obj-270", "flonum", "float", 12.0, 5, "obj-262", "multislider", "list", 0.418135, 5, "obj-299", "flonum", "float", 432.0, 5, "obj-298", "flonum", "float", 377.0, 5, "obj-291", "number", "int", 99, 5, "obj-290", "multislider", "list", 0.556461, 5, "obj-303", "number", "int", 147, 5, "obj-302", "multislider", "list", 0.38085, 5, "obj-356", "flonum", "float", 1.1, 8, "obj-10", "multislider", "list", 0.513514, 0.0, 0.0, 0.0, 5, "obj-230", "flonum", "float", 2.0, 8, "obj-34", "multislider", "list", 0.0, 0.337838, 0.067568, 0.0, 8, "obj-182", "multislider", "list", 0.675676, 0.418919, 0.0, 0.0, 8, "obj-133", "multislider", "list", 0.783784, 0.243243, 0.0, 0.310811, 8, "obj-225", "multislider", "list", 0.378378, 0.378378, 0.554054, 0.0, 8, "obj-189", "multislider", "list", 0.837838, 0.378378, 0.0, 0.0, 5, "obj-240", "number", "int", 36, 5, "obj-236", "flonum", "float", 1.0, 5, "obj-459", "flonum", "float", 1.0, 5, "obj-494", "flonum", "float", 1.0, 5, "obj-317", "flonum", "float", 238.0, 5, "obj-36", "number", "int", 555, 5, "obj-323", "flonum", "float", 451.392029, 5, "obj-329", "flonum", "float", 30.0, 5, "obj-330", "flonum", "float", 86.604149, 5, "obj-338", "number", "int", 15, 5, "obj-337", "multislider", "list", 1.0, 5, "obj-336", "flonum", "float", 0.0, 8, "obj-343", "multislider", "list", 0.490566, 0.773585, 0.0, 0.339623, 5, "obj-358", "flonum", "float", 16.376614 ]
						}
, 						{
							"number" : 4,
							"data" : [ 5, "obj-9", "toggle", "int", 0, 5, "obj-28", "flonum", "float", 73.416191, 5, "obj-1", "live.gain~", "float", -21.783077, 5, "<invalid>", "multislider", "list", 0.0, 5, "obj-64", "multislider", "list", 0.047781, 5, "obj-62", "kslider", "int", 38, 5, "obj-125", "multislider", "list", 0.0, 5, "obj-234", "number", "int", 74, 5, "obj-233", "multislider", "list", 0.402872, 5, "obj-259", "flonum", "float", 44.0, 5, "obj-258", "flonum", "float", 22.0, 5, "obj-249", "number", "int", 208, 5, "obj-247", "multislider", "list", 0.101772, 5, "obj-271", "flonum", "float", 34.0, 5, "obj-270", "flonum", "float", 12.0, 5, "obj-262", "multislider", "list", 0.611339, 5, "obj-299", "flonum", "float", 453.0, 5, "obj-298", "flonum", "float", 377.0, 5, "obj-291", "number", "int", 99, 5, "obj-290", "multislider", "list", 0.768044, 5, "obj-303", "number", "int", 59, 5, "obj-302", "multislider", "list", 0.141524, 5, "obj-356", "flonum", "float", 1.1, 8, "obj-10", "multislider", "list", 0.513514, 0.0, 0.0, 0.0, 5, "obj-230", "flonum", "float", 31.0, 8, "obj-34", "multislider", "list", 0.0, 0.337838, 0.067568, 0.0, 8, "obj-182", "multislider", "list", 0.675676, 0.418919, 0.0, 0.0, 8, "obj-133", "multislider", "list", 0.783784, 0.243243, 0.0, 0.310811, 8, "obj-225", "multislider", "list", 0.0, 0.0, 0.0, 0.0, 8, "obj-189", "multislider", "list", 0.0, 0.72973, 0.0, 0.0, 5, "obj-240", "number", "int", 36, 5, "obj-236", "flonum", "float", 1.0, 5, "obj-459", "flonum", "float", 1.0, 5, "obj-494", "flonum", "float", 1.0, 5, "obj-317", "flonum", "float", 20.0, 5, "obj-36", "number", "int", 0, 5, "obj-323", "flonum", "float", 21.0, 5, "obj-329", "flonum", "float", 0.05, 5, "obj-330", "flonum", "float", 9.258389, 5, "obj-338", "number", "int", 7, 5, "obj-337", "multislider", "list", 0.414473, 5, "obj-336", "flonum", "float", -1.0, 8, "obj-343", "multislider", "list", 0.528302, 0.0, 0.0, 0.0, 5, "obj-358", "flonum", "float", 2.48684 ]
						}
, 						{
							"number" : 5,
							"data" : [ 5, "obj-9", "toggle", "int", 1, 5, "obj-28", "flonum", "float", 82.406891, 5, "obj-64", "multislider", "list", 0.777763, 5, "obj-62", "kslider", "int", 40, 5, "obj-125", "multislider", "list", 0.445315, 5, "obj-234", "number", "int", 74, 5, "obj-233", "multislider", "list", 0.412731, 5, "obj-259", "flonum", "float", 54.0, 5, "obj-258", "flonum", "float", 13.0, 5, "obj-249", "number", "int", 208, 5, "obj-247", "multislider", "list", 0.193798, 5, "obj-271", "flonum", "float", 100.0, 5, "obj-270", "flonum", "float", 88.0, 5, "obj-262", "multislider", "list", 0.749118, 5, "obj-299", "flonum", "float", 366.0, 5, "obj-298", "flonum", "float", 103.0, 5, "obj-291", "number", "int", 515, 5, "obj-290", "multislider", "list", 0.510483, 5, "obj-303", "number", "int", 59, 5, "obj-302", "multislider", "list", 0.358928, 5, "obj-356", "flonum", "float", 1.07, 8, "obj-10", "multislider", "list", 0.513514, 0.0, 0.0, 0.0, 5, "obj-230", "flonum", "float", 32.0, 8, "obj-34", "multislider", "list", 0.0, 0.337838, 0.067568, 0.0, 8, "obj-182", "multislider", "list", 0.675676, 0.418919, 0.0, 0.0, 8, "obj-133", "multislider", "list", 0.635135, 0.0, 0.0, 0.0, 8, "obj-225", "multislider", "list", 0.554054, 0.0, 0.0, 0.0, 8, "obj-189", "multislider", "list", 0.0, 0.72973, 0.0, 0.0, 5, "obj-240", "number", "int", 36, 5, "obj-236", "flonum", "float", 1.0, 5, "obj-459", "flonum", "float", 1.0, 5, "obj-494", "flonum", "float", 1.0, 5, "obj-317", "flonum", "float", 20.0, 5, "obj-36", "number", "int", 135, 5, "obj-323", "flonum", "float", 80.672203, 5, "obj-329", "flonum", "float", -2.17, 5, "obj-330", "flonum", "float", 19.647814, 5, "obj-338", "number", "int", 7, 5, "obj-337", "multislider", "list", 0.424617, 5, "obj-336", "flonum", "float", 0.0, 8, "obj-343", "multislider", "list", 0.528302, 0.0, 0.0, 0.0, 5, "obj-358", "flonum", "float", 3.547702, 5, "obj-1", "live.gain~", "float", -21.783077, 5, "obj-42", "live.toggle", "float", 1.0, 5, "obj-457", "number", "int", 101, 5, "obj-51", "umenu", "int", 1, 5, "obj-530", "live.menu", "float", 13.0 ]
						}
, 						{
							"number" : 6,
							"data" : [ 5, "obj-9", "toggle", "int", 1, 5, "obj-28", "flonum", "float", 73.416191, 5, "obj-64", "multislider", "list", 1.0, 5, "obj-62", "kslider", "int", 38, 5, "obj-125", "multislider", "list", 0.54574, 5, "obj-234", "number", "int", 74, 5, "obj-233", "multislider", "list", 0.505808, 5, "obj-259", "flonum", "float", 96.0, 5, "obj-258", "flonum", "float", 13.0, 5, "obj-249", "number", "int", 208, 5, "obj-247", "multislider", "list", 0.399323, 5, "obj-271", "flonum", "float", 100.0, 5, "obj-270", "flonum", "float", 88.0, 5, "obj-262", "multislider", "list", 1.0, 5, "obj-299", "flonum", "float", 443.0, 5, "obj-298", "flonum", "float", 121.0, 5, "obj-291", "number", "int", 515, 5, "obj-290", "multislider", "list", 0.625604, 5, "obj-303", "number", "int", 59, 5, "obj-302", "multislider", "list", 0.71878, 5, "obj-356", "flonum", "float", 1.07, 8, "obj-10", "multislider", "list", 0.513514, 0.0, 0.0, 0.0, 5, "obj-230", "flonum", "float", 38.0, 8, "obj-34", "multislider", "list", 0.0, 0.337838, 0.067568, 0.0, 8, "obj-182", "multislider", "list", 0.675676, 0.418919, 0.0, 0.0, 8, "obj-133", "multislider", "list", 0.635135, 0.0, 0.0, 0.0, 8, "obj-225", "multislider", "list", 0.554054, 0.0, 0.0, 0.0, 8, "obj-189", "multislider", "list", 0.0, 0.72973, 0.0, 0.0, 5, "obj-240", "number", "int", 36, 5, "obj-236", "flonum", "float", 1.0, 5, "obj-459", "flonum", "float", 1.0, 5, "obj-494", "flonum", "float", 1.0, 5, "obj-317", "flonum", "float", 49.0, 5, "obj-36", "number", "int", 183, 5, "obj-323", "flonum", "float", 149.324707, 5, "obj-329", "flonum", "float", -2.17, 5, "obj-330", "flonum", "float", 40.519241, 5, "obj-338", "number", "int", 7, 5, "obj-337", "multislider", "list", 0.520375, 5, "obj-336", "flonum", "float", 0.0, 8, "obj-343", "multislider", "list", 0.528302, 0.0, 0.0, 0.0, 5, "obj-358", "flonum", "float", 4.122247, 5, "obj-1", "live.gain~", "float", -21.783077, 5, "obj-42", "live.toggle", "float", 1.0, 5, "obj-457", "number", "int", 100, 5, "obj-51", "umenu", "int", 0, 5, "obj-530", "live.menu", "float", 7.0 ]
						}
 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-17",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 4609.345703, 1873.706299, 127.0, 19.0 ],
					"text" : "pattrstorage genone"
				}

			}
, 			{
				"box" : 				{
					"active" : 					{
						"live.gain~" : 0
					}
,
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-366",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 4609.345703, 2095.706299, 118.0, 20.0 ],
					"saved_object_attributes" : 					{
						"parameter_enable" : 0,
						"client_rect" : [ 4, 44, 848, 1084 ],
						"storage_rect" : [ 766, 44, 1220, 302 ]
					}
,
					"text" : "pattrstorage genone",
					"varname" : "genone"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-365",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 4609.345703, 2181.706299, 199.0, 20.0 ],
					"restore" : 					{
						"flonum" : [ 97.998856 ],
						"flonum[10]" : [ 1.0 ],
						"flonum[11]" : [ 1.0 ],
						"flonum[12]" : [ 2.0 ],
						"flonum[13]" : [ 133.527145 ],
						"flonum[14]" : [ 9.0 ],
						"flonum[15]" : [ 11.913 ],
						"flonum[16]" : [ -0.1 ],
						"flonum[17]" : [ 5.298066 ],
						"flonum[1]" : [ 9.0 ],
						"flonum[2]" : [ 8.0 ],
						"flonum[3]" : [ 72.0 ],
						"flonum[4]" : [ 71.0 ],
						"flonum[5]" : [ 146.0 ],
						"flonum[6]" : [ 143.0 ],
						"flonum[7]" : [ 1.0 ],
						"flonum[8]" : [ 2.0 ],
						"flonum[9]" : [ 1.0 ],
						"kslider" : [ 43 ],
						"live.gain~" : [ -17.305992 ],
						"live.toggle" : [ 1.0 ],
						"multislider[10]" : [ 0.0, 0.0, 0.0, 0.0 ],
						"multislider[11]" : [ 0.0, 0.0, 0.0, 0.648649 ],
						"multislider[12]" : [ 0.905405, 0.0, 0.0, 0.0 ],
						"multislider[13]" : [ 0.0, 0.216216, 0.0, 0.0 ],
						"multislider[14]" : [ 0.314148 ],
						"multislider[15]" : [ 0.0, 0.0, 0.943396, 0.0 ],
						"multislider[1]" : [ 0.72 ],
						"multislider[2]" : [ 0.847579 ],
						"multislider[3]" : [ 0.0 ],
						"multislider[4]" : [ 0.0 ],
						"multislider[5]" : [ 0.0 ],
						"multislider[6]" : [ 0.018107 ],
						"multislider[7]" : [ 0.042511 ],
						"multislider[8]" : [ 0.0, 0.0, 0.0, 0.0 ],
						"multislider[9]" : [ 0.0, 0.0, 0.0, 0.0 ],
						"number" : [ 0 ],
						"number[1]" : [ 0 ],
						"number[2]" : [ 158 ],
						"number[3]" : [ 46 ],
						"number[4]" : [ 0 ],
						"number[5]" : [ 155 ],
						"number[6]" : [ 15 ],
						"number[7]" : [ 108 ],
						"stepduration[1]" : [ 10.0 ],
						"textbutton" : [ -1 ],
						"textbutton[1]" : [ -1 ],
						"toggle" : [ 0 ],
						"umenu" : [ 1 ]
					}
,
					"text" : "autopattr @autoname 1 @greedy 1",
					"varname" : "u504001035"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-364",
					"maxclass" : "bpatcher",
					"name" : "lfomgd.maxpat",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 2930.581055, 223.088135, 289.7435, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 814.267822, 370.947113, 264.7435, 115.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-363",
					"maxclass" : "bpatcher",
					"name" : "lfomgd.maxpat",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 2533.687744, 223.088135, 289.7435, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 544.455566, 370.947113, 264.7435, 115.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-362",
					"maxclass" : "bpatcher",
					"name" : "lfomgd.maxpat",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 2136.794189, 223.088135, 289.7435, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 276.490967, 370.947113, 264.7435, 115.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-360",
					"maxclass" : "bpatcher",
					"name" : "lfomgd.maxpat",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1739.900757, 231.776245, 289.7435, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 11.93689, 370.947113, 264.7435, 115.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 0.862745, 0.207843, 0.133333, 1.0 ],
					"id" : "obj-358",
					"ignoreclick" : 1,
					"maxclass" : "flonum",
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 4037.51416, 2283.600586, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1162.223145, 232.240326, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 0.52 ],
					"triangle" : 0,
					"tricolor" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"varname" : "flonum[17]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-354",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1114.655762, 147.087372, 60.0, 20.0 ],
					"text" : "max mod",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-353",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 931.536011, 147.087372, 60.0, 20.0 ],
					"text" : "max mod",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-352",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1105.417236, 232.240326, 40.0, 20.0 ],
					"text" : "result",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-342",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "float", "float", "float", "float" ],
					"patching_rect" : [ 1469.915405, 2668.245605, 172.218445, 20.0 ],
					"text" : "unpack f f f f"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-343",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"orientation" : 0,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1469.915405, 2611.245605, 73.0, 39.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1105.417236, 176.647919, 55.033493, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 1,
					"size" : 4,
					"slidercolor" : [ 0.364706, 0.890196, 0.94902, 0.64 ],
					"spacing" : 2,
					"varname" : "multislider[15]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-344",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1623.133667, 2700.245605, 47.0, 19.0 ],
					"text" : "3 6 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-345",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1572.060913, 2700.245605, 47.0, 19.0 ],
					"text" : "2 6 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-346",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1520.988159, 2700.245605, 47.0, 19.0 ],
					"text" : "1 6 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-347",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1469.915405, 2750.245605, 59.0, 20.0 ],
					"text" : "s volume"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-348",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1469.915405, 2700.245605, 47.0, 19.0 ],
					"text" : "0 6 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-335",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4113.252441, 2149.250732, 69.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1114.655762, 84.531219, 69.0, 20.0 ],
					"text" : "bandwidth",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Helvetica",
					"fontsize" : 34.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-336",
					"maxclass" : "flonum",
					"minimum" : -9.0,
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 4104.01416, 2169.250732, 128.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1105.417236, 104.531219, 128.0, 40.0 ],
					"textcolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"tricolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"varname" : "flonum[16]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.058552, 0.058563, 0.058549, 1.0 ],
					"bordercolor" : [ 0.113725, 0.113725, 0.121569, 1.0 ],
					"candicane2" : [ 0.073939, 0.097567, 0.106429, 1.0 ],
					"candicane3" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"candycane" : 3,
					"id" : "obj-337",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 3834.781494, 2090.265381, 168.46524, 80.063599 ],
					"presentation" : 1,
					"presentation_rect" : [ 1174.428223, 176.647919, 72.46521, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 5,
					"slidercolor" : [ 0.47, 0.77, 0.83, 0.56 ],
					"varname" : "multislider[14]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-338",
					"maxclass" : "number",
					"minimum" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 4101.51416, 2073.55249, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1211.44873, 147.087372, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"tricolor" : [ 0.364409, 0.890907, 0.948841, 1.0 ],
					"varname" : "number[6]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-339",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 4037.51416, 2105.265381, 99.0, 20.0 ],
					"text" : "scale 0. 1. 1 120"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-340",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 4037.51416, 2236.892822, 85.5, 20.0 ],
					"text" : "+ 1."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-341",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 4037.51416, 2030.697754, 83.0, 20.0 ],
					"text" : "snapshot~ 10"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-334",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 931.536011, 232.240326, 40.0, 20.0 ],
					"text" : "result",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 0.862745, 0.207843, 0.133333, 1.0 ],
					"id" : "obj-330",
					"ignoreclick" : 1,
					"maxclass" : "flonum",
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 3338.666748, 1938.134766, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 986.834961, 232.240326, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 0.52 ],
					"triangle" : 0,
					"tricolor" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"varname" : "flonum[15]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-328",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 3414.405029, 1808.29126, 69.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 931.536011, 84.531219, 69.0, 20.0 ],
					"text" : "center shift",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Helvetica",
					"fontsize" : 34.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-329",
					"maxclass" : "flonum",
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 3405.166748, 1828.29126, 128.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 931.536011, 104.531219, 128.0, 40.0 ],
					"textcolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"tricolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"varname" : "flonum[14]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 0.862745, 0.207843, 0.133333, 1.0 ],
					"id" : "obj-323",
					"ignoreclick" : 1,
					"maxclass" : "flonum",
					"minimum" : 0.01,
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 189.34613, 397.633728, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 814.267822, 232.240326, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 0.52 ],
					"triangle" : 0,
					"tricolor" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"varname" : "flonum[13]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-324",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 751.941772, 232.240326, 40.0, 20.0 ],
					"text" : "result",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-325",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 743.180176, 224.340118, 170.0, 35.827942 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-322",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 751.941772, 147.087372, 60.0, 20.0 ],
					"text" : "max mod",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-36",
					"maxclass" : "number",
					"minimum" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 253.34613, 158.356506, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 834.476562, 147.087372, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"tricolor" : [ 0.364409, 0.890907, 0.948841, 1.0 ],
					"varname" : "number[5]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-316",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 383.84613, 275.069031, 27.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 886.180176, 124.531219, 27.0, 20.0 ],
					"text" : "ms",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Helvetica",
					"fontsize" : 34.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-317",
					"maxclass" : "flonum",
					"minimum" : 0.01,
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 255.84613, 255.069031, 128.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 743.180176, 104.531219, 128.0, 40.0 ],
					"textcolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"tricolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"varname" : "flonum[12]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-315",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 265.084412, 235.069031, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 751.941772, 84.531219, 60.0, 20.0 ],
					"text" : "gate time",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-321",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 743.180176, 76.285919, 170.0, 90.801437 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-314",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 27.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 674.325806, 117.961151, 27.0, 20.0 ],
					"text" : "ms",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-280",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 554.873047, 228.318054, 40.0, 20.0 ],
					"text" : "result",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-281",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 554.873047, 141.961151, 60.0, 20.0 ],
					"text" : "max mod",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-282",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 554.873047, 254.429474, 40.0, 20.0 ],
					"text" : "curve",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-283",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 384.624268, 228.318054, 40.0, 20.0 ],
					"text" : "result",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-284",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 384.624268, 141.961151, 60.0, 20.0 ],
					"text" : "max mod",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-277",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 206.916748, 228.318054, 40.0, 20.0 ],
					"text" : "result",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-278",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 206.916748, 141.961151, 60.0, 20.0 ],
					"text" : "max mod",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-279",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 206.916748, 254.429474, 40.0, 20.0 ],
					"text" : "curve",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-261",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 30.941772, 228.318054, 40.0, 20.0 ],
					"text" : "result",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-245",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 30.941772, 141.961151, 60.0, 20.0 ],
					"text" : "max mod",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"htricolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"id" : "obj-494",
					"maxclass" : "flonum",
					"minimum" : 0.0,
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1141.627197, 1808.380127, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 604.455566, 254.429474, 50.0, 20.0 ],
					"textcolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"tricolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"varname" : "flonum[11]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"htricolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"id" : "obj-459",
					"maxclass" : "flonum",
					"minimum" : 0.0,
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 996.303833, 1808.380127, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 250.520142, 254.429474, 50.0, 20.0 ],
					"textcolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"tricolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"varname" : "flonum[10]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"htricolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"id" : "obj-236",
					"maxclass" : "flonum",
					"minimum" : 0.0,
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 863.805542, 1808.380127, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 82.180176, 254.429474, 50.0, 20.0 ],
					"textcolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"tricolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"varname" : "flonum[9]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-241",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 30.941772, 254.429474, 40.0, 20.0 ],
					"text" : "curve",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-240",
					"maxclass" : "number",
					"maximum" : 100,
					"minimum" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1931.424561, 962.963989, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 463.07666, 141.961151, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"tricolor" : [ 0.364409, 0.890907, 0.948841, 1.0 ],
					"varname" : "number[4]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-188",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "float", "float", "float", "float" ],
					"patching_rect" : [ 1240.051636, 2668.245605, 172.218445, 20.0 ],
					"text" : "unpack f f f f"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-189",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"orientation" : 0,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1240.051636, 2611.245605, 73.0, 39.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 931.536011, 176.647919, 76.238373, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 1,
					"size" : 4,
					"slidercolor" : [ 0.364706, 0.890196, 0.94902, 0.64 ],
					"spacing" : 2,
					"varname" : "multislider[13]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-190",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1393.269897, 2700.245605, 47.0, 19.0 ],
					"text" : "3 5 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-215",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1342.197144, 2700.245605, 47.0, 19.0 ],
					"text" : "2 5 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-216",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1291.12439, 2700.245605, 47.0, 19.0 ],
					"text" : "1 5 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-217",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1240.051636, 2750.245605, 59.0, 20.0 ],
					"text" : "s volume"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-222",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1240.051636, 2700.245605, 47.0, 19.0 ],
					"text" : "0 5 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-223",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "float", "float", "float", "float" ],
					"patching_rect" : [ 1033.272339, 2668.245605, 172.218445, 20.0 ],
					"text" : "unpack f f f f"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-225",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"orientation" : 0,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1033.272339, 2611.245605, 73.0, 39.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 751.941772, 176.647919, 76.238373, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 1,
					"size" : 4,
					"slidercolor" : [ 0.364706, 0.890196, 0.94902, 0.64 ],
					"spacing" : 2,
					"varname" : "multislider[12]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-226",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1186.490845, 2700.245605, 47.0, 19.0 ],
					"text" : "3 4 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-227",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1135.417847, 2700.245605, 47.0, 19.0 ],
					"text" : "2 4 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-228",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1084.345093, 2700.245605, 47.0, 19.0 ],
					"text" : "1 4 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-229",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1033.272339, 2750.245605, 59.0, 20.0 ],
					"text" : "s volume"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-231",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1033.272339, 2700.245605, 47.0, 19.0 ],
					"text" : "0 4 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-132",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "float", "float", "float", "float" ],
					"patching_rect" : [ 820.051636, 2668.245605, 172.218445, 20.0 ],
					"text" : "unpack f f f f"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-133",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"orientation" : 0,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 820.051636, 2611.245605, 73.0, 39.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 554.873047, 174.810822, 76.238373, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 1,
					"size" : 4,
					"slidercolor" : [ 0.364706, 0.890196, 0.94902, 0.64 ],
					"spacing" : 2,
					"varname" : "multislider[11]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-135",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 973.269897, 2700.245605, 47.0, 19.0 ],
					"text" : "3 3 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-136",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 922.197144, 2700.245605, 47.0, 19.0 ],
					"text" : "2 3 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-158",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 871.12439, 2700.245605, 47.0, 19.0 ],
					"text" : "1 3 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-177",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 820.051636, 2750.245605, 59.0, 20.0 ],
					"text" : "s volume"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-178",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 820.051636, 2700.245605, 47.0, 19.0 ],
					"text" : "0 3 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-181",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "float", "float", "float", "float" ],
					"patching_rect" : [ 613.272339, 2668.245605, 172.218445, 20.0 ],
					"text" : "unpack f f f f"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-182",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"orientation" : 0,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 613.272339, 2611.245605, 73.0, 39.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 384.624268, 174.810822, 76.238373, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 1,
					"size" : 4,
					"slidercolor" : [ 0.364706, 0.890196, 0.94902, 0.64 ],
					"spacing" : 2,
					"varname" : "multislider[10]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-183",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 766.490845, 2700.245605, 47.0, 19.0 ],
					"text" : "3 2 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-184",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 715.417847, 2700.245605, 47.0, 19.0 ],
					"text" : "2 2 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-185",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 664.345093, 2700.245605, 47.0, 19.0 ],
					"text" : "1 2 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-186",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 613.272339, 2750.245605, 59.0, 20.0 ],
					"text" : "s volume"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-187",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 613.272339, 2700.245605, 47.0, 19.0 ],
					"text" : "0 2 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-33",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "float", "float", "float", "float" ],
					"patching_rect" : [ 403.051422, 2668.245605, 172.218445, 20.0 ],
					"text" : "unpack f f f f"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-34",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"orientation" : 0,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 403.051422, 2611.245605, 73.0, 39.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 205.916748, 174.810822, 76.238373, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 1,
					"size" : 4,
					"slidercolor" : [ 0.364706, 0.890196, 0.94902, 0.64 ],
					"spacing" : 2,
					"varname" : "multislider[9]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-39",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 556.269897, 2700.245605, 47.0, 19.0 ],
					"text" : "3 1 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-41",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 505.197144, 2700.245605, 47.0, 19.0 ],
					"text" : "2 1 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-117",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 454.12439, 2700.245605, 47.0, 19.0 ],
					"text" : "1 1 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-127",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 403.051422, 2750.245605, 59.0, 20.0 ],
					"text" : "s volume"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-128",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 403.051422, 2700.245605, 47.0, 19.0 ],
					"text" : "0 1 $1"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 0.862745, 0.207843, 0.133333, 1.0 ],
					"id" : "obj-230",
					"ignoreclick" : 1,
					"maxclass" : "flonum",
					"minimum" : 0.01,
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 883.304688, 1268.190063, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 82.180176, 228.318054, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 0.52 ],
					"triangle" : 0,
					"tricolor" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"varname" : "flonum[8]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-32",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "float", "float", "float", "float" ],
					"patching_rect" : [ 196.272491, 2668.245605, 172.218445, 20.0 ],
					"text" : "unpack f f f f"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-10",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"orientation" : 0,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 196.272491, 2611.245605, 73.0, 39.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 30.941772, 174.810822, 76.238373, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 1,
					"size" : 4,
					"slidercolor" : [ 0.364706, 0.890196, 0.94902, 0.64 ],
					"spacing" : 2,
					"varname" : "multislider[8]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-383",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 968.043335, 1117.241333, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 30.941772, 81.961151, 43.0, 20.0 ],
					"text" : "attack",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-361",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1086.804688, 1157.241455, 27.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 147.941772, 117.961151, 27.0, 20.0 ],
					"text" : "ms",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Helvetica",
					"fontsize" : 34.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-356",
					"maxclass" : "flonum",
					"minimum" : 0.01,
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 958.804688, 1137.241455, 128.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 30.941772, 101.961151, 128.0, 40.0 ],
					"textcolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"tricolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"varname" : "flonum[7]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.058552, 0.058563, 0.058549, 1.0 ],
					"bordercolor" : [ 0.113725, 0.113725, 0.121569, 1.0 ],
					"candicane2" : [ 0.073939, 0.097567, 0.106429, 1.0 ],
					"candicane3" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"candycane" : 3,
					"id" : "obj-302",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 3135.934082, 1749.305664, 168.46524, 80.063599 ],
					"presentation" : 1,
					"presentation_rect" : [ 1007.721924, 176.647919, 72.46521, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 5,
					"slidercolor" : [ 0.47, 0.77, 0.83, 0.56 ],
					"varname" : "multislider[7]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-303",
					"maxclass" : "number",
					"minimum" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 3402.666748, 1732.592773, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 986.834961, 147.087372, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"tricolor" : [ 0.364409, 0.890907, 0.948841, 1.0 ],
					"varname" : "number[3]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-304",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 3338.666748, 1764.305664, 99.0, 20.0 ],
					"text" : "scale 0. 1. 1 120"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-305",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 3338.666748, 1895.93335, 85.5, 20.0 ],
					"text" : "+ 1."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-306",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 3338.666748, 1689.738037, 83.0, 20.0 ],
					"text" : "snapshot~ 10"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-288",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 2359.922119, 1192.177979, 94.5, 20.0 ],
					"text" : "pak"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.058552, 0.058563, 0.058549, 1.0 ],
					"bordercolor" : [ 0.113725, 0.113725, 0.121569, 1.0 ],
					"candicane2" : [ 0.073939, 0.097567, 0.106429, 1.0 ],
					"candicane3" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"candycane" : 3,
					"id" : "obj-290",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 2147.552734, 1097.177856, 168.46524, 80.063599 ],
					"presentation" : 1,
					"presentation_rect" : [ 634.860596, 174.810822, 72.46521, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 5,
					"slidercolor" : [ 0.47, 0.77, 0.83, 0.56 ],
					"varname" : "multislider[6]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-291",
					"maxclass" : "number",
					"minimum" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 2423.922119, 962.963989, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 633.873047, 141.961151, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"tricolor" : [ 0.364409, 0.890907, 0.948841, 1.0 ],
					"varname" : "number[2]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-292",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 2359.922119, 994.676636, 99.0, 20.0 ],
					"text" : "scale 0. 1. 1 120"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-293",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 2359.922119, 1228.177979, 85.5, 20.0 ],
					"text" : "+ 1."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-294",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 2359.922119, 919.109253, 83.0, 20.0 ],
					"text" : "snapshot~ 10"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-295",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 2435.422119, 1073.661987, 79.0, 20.0 ],
					"text" : "loadmess 10"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-296",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 2359.922119, 1308.189941, 96.0, 18.0 ],
					"text" : "release_time $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-297",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 2444.6604, 1117.241333, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 554.873047, 81.961151, 50.0, 20.0 ],
					"text" : "release",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Helvetica",
					"fontsize" : 34.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-298",
					"maxclass" : "flonum",
					"minimum" : 0.01,
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 2435.422119, 1137.241455, 128.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 554.873047, 101.961151, 128.0, 40.0 ],
					"textcolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"tricolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"varname" : "flonum[6]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 0.862745, 0.207843, 0.133333, 1.0 ],
					"id" : "obj-299",
					"ignoreclick" : 1,
					"maxclass" : "flonum",
					"minimum" : 0.01,
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 2359.922119, 1268.190063, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 604.455566, 228.318054, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 0.52 ],
					"triangle" : 0,
					"tricolor" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"varname" : "flonum[5]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-274",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 2073.540771, 1157.241455, 27.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 510.54187, 117.961151, 21.0, 20.0 ],
					"text" : "%",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-272",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 1869.670166, 1352.598633, 42.0, 20.0 ],
					"text" : "* 0.01"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-260",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1869.670166, 1192.177979, 94.5, 20.0 ],
					"text" : "pak"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.058552, 0.058563, 0.058549, 1.0 ],
					"bordercolor" : [ 0.113725, 0.113725, 0.121569, 1.0 ],
					"candicane2" : [ 0.073939, 0.097567, 0.106429, 1.0 ],
					"candicane3" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"candycane" : 3,
					"id" : "obj-262",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1657.300537, 1097.177856, 168.46524, 80.063599 ],
					"presentation" : 1,
					"presentation_rect" : [ 467.940308, 174.810822, 63.60157, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 5,
					"slidercolor" : [ 0.47, 0.77, 0.83, 0.56 ],
					"varname" : "multislider[5]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-264",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1869.670166, 994.676636, 99.0, 20.0 ],
					"text" : "scale 0. 1. 1 100"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-265",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 1869.670166, 1228.177979, 85.5, 20.0 ],
					"text" : "+ 1."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-266",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 1869.670166, 919.109253, 83.0, 20.0 ],
					"text" : "snapshot~ 10"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-267",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1945.170166, 1073.661987, 79.0, 20.0 ],
					"text" : "loadmess 10"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-268",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1869.670166, 1390.159912, 97.0, 18.0 ],
					"text" : "sustain_level $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-269",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1954.408447, 1117.241333, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 384.624268, 81.961151, 49.0, 20.0 ],
					"text" : "sustain",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Helvetica",
					"fontsize" : 34.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-270",
					"maxclass" : "flonum",
					"maximum" : 100.0,
					"minimum" : 0.0,
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1945.170166, 1137.241455, 128.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 384.624268, 101.961151, 128.0, 40.0 ],
					"textcolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"tricolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"varname" : "flonum[4]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 0.862745, 0.207843, 0.133333, 1.0 ],
					"id" : "obj-271",
					"ignoreclick" : 1,
					"maxclass" : "flonum",
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1869.670166, 1308.189941, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 430.44873, 228.318054, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 0.52 ],
					"triangle" : 0,
					"tricolor" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"varname" : "flonum[3]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-244",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1355.424316, 1192.177979, 94.5, 20.0 ],
					"text" : "pak"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.058552, 0.058563, 0.058549, 1.0 ],
					"bordercolor" : [ 0.113725, 0.113725, 0.121569, 1.0 ],
					"candicane2" : [ 0.073939, 0.097567, 0.106429, 1.0 ],
					"candicane3" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"candycane" : 3,
					"id" : "obj-247",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1143.054932, 1097.177856, 168.46524, 80.063599 ],
					"presentation" : 1,
					"presentation_rect" : [ 286.721924, 174.810822, 72.46521, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 5,
					"slidercolor" : [ 0.47, 0.77, 0.83, 0.56 ],
					"varname" : "multislider[4]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-249",
					"maxclass" : "number",
					"minimum" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1419.424316, 962.963989, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 276.490967, 141.961151, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"tricolor" : [ 0.364409, 0.890907, 0.948841, 1.0 ],
					"varname" : "number[1]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-251",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1355.424316, 994.676636, 99.0, 20.0 ],
					"text" : "scale 0. 1. 1 120"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-252",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 1355.424316, 1228.177979, 85.5, 20.0 ],
					"text" : "+ 1."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-253",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 1355.424316, 919.109253, 83.0, 20.0 ],
					"text" : "snapshot~ 10"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-254",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1430.924316, 1073.661987, 79.0, 20.0 ],
					"text" : "loadmess 10"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-255",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1355.424316, 1308.189941, 89.0, 18.0 ],
					"text" : "decay_time $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-256",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1440.162598, 1117.241333, 59.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 206.916748, 81.961151, 43.0, 20.0 ],
					"text" : "decay",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-257",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1558.924316, 1157.241455, 27.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 324.710327, 117.961151, 27.0, 20.0 ],
					"text" : "ms",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Helvetica",
					"fontsize" : 34.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-258",
					"maxclass" : "flonum",
					"minimum" : 0.01,
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1430.924316, 1137.241455, 128.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 206.916748, 101.961151, 128.0, 40.0 ],
					"textcolor" : [ 0.999877, 1.0, 0.999829, 1.0 ],
					"tricolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"varname" : "flonum[2]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"htricolor" : [ 0.862745, 0.207843, 0.133333, 1.0 ],
					"id" : "obj-259",
					"ignoreclick" : 1,
					"maxclass" : "flonum",
					"minimum" : 0.01,
					"numdecimalplaces" : 2,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 1355.424316, 1268.190063, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 250.520142, 228.318054, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 0.52 ],
					"triangle" : 0,
					"tricolor" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"varname" : "flonum[1]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-243",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1869.670166, 1268.190063, 62.0, 20.0 ],
					"text" : "clip 0 100"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-242",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 883.304688, 1192.177979, 94.5, 20.0 ],
					"text" : "pak"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.058552, 0.058563, 0.058549, 1.0 ],
					"bordercolor" : [ 0.113725, 0.113725, 0.121569, 1.0 ],
					"candicane2" : [ 0.073939, 0.097567, 0.106429, 1.0 ],
					"candicane3" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"candycane" : 3,
					"id" : "obj-233",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 670.935425, 1097.177856, 168.46524, 80.063599 ],
					"presentation" : 1,
					"presentation_rect" : [ 113.476562, 174.810822, 72.46521, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 5,
					"slidercolor" : [ 0.47, 0.77, 0.83, 0.56 ],
					"varname" : "multislider[3]"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"bordercolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"hbgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"htricolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-234",
					"maxclass" : "number",
					"minimum" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 947.304688, 962.963989, 50.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 102.932861, 141.961151, 50.0, 20.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"tricolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"varname" : "number"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-235",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 883.304688, 994.676636, 99.0, 20.0 ],
					"text" : "scale 0. 1. 1 120"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-238",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 883.304688, 1228.177979, 85.5, 20.0 ],
					"text" : "+ 1."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-239",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 883.304688, 919.109253, 83.0, 20.0 ],
					"text" : "snapshot~ 10"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-134",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 349.490875, 2700.245605, 47.0, 19.0 ],
					"text" : "3 0 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-137",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 298.417999, 2700.245605, 47.0, 19.0 ],
					"text" : "2 0 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-129",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 247.345245, 2700.245605, 47.0, 19.0 ],
					"text" : "1 0 $1"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.058552, 0.058563, 0.058549, 1.0 ],
					"bordercolor" : [ 0.113725, 0.113725, 0.121569, 1.0 ],
					"candicane2" : [ 0.073939, 0.097567, 0.106429, 1.0 ],
					"candicane3" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"candycane" : 3,
					"id" : "obj-125",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 346.61322, 128.324707, 168.46524, 80.063599 ],
					"presentation" : 1,
					"presentation_rect" : [ 834.476562, 176.647919, 78.703613, 39.0 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 5,
					"slidercolor" : [ 0.47, 0.77, 0.83, 0.56 ],
					"varname" : "multislider[2]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-124",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1569.032715, 285.776245, 57.0, 20.0 ],
					"text" : "r volume"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-123",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 196.272491, 2750.245605, 59.0, 20.0 ],
					"text" : "s volume"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-19",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 189.34613, 190.069153, 99.0, 20.0 ],
					"text" : "scale 0. 1. 1 120"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-118",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 196.272491, 2700.245605, 47.0, 19.0 ],
					"text" : "0 0 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-107",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 189.34613, 334.054382, 85.5, 20.0 ],
					"text" : "+ 1."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-104",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 189.34613, 48.705017, 83.0, 20.0 ],
					"text" : "snapshot~ 10"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-44",
					"maxclass" : "newobj",
					"numinlets" : 4,
					"numoutlets" : 9,
					"outlettype" : [ "signal", "signal", "signal", "signal", "signal", "signal", "signal", "signal", "list" ],
					"patching_rect" : [ 1739.900757, 398.285156, 1209.680298, 20.0 ],
					"text" : "matrix~ 4 8 1."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-35",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 2739.452148, 2113.513428, 37.0, 21.0 ],
					"text" : "mtof"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-62",
					"maxclass" : "kslider",
					"numinlets" : 2,
					"numoutlets" : 2,
					"offset" : 24,
					"outlettype" : [ "int", "int" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 2739.452148, 2043.449951, 432.0, 53.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1018.655762, 311.647919, 252.0, 34.0 ],
					"range" : 61,
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_initial" : [ 55 ],
							"parameter_type" : 1,
							"parameter_initial_enable" : 1,
							"parameter_invisible" : 1,
							"parameter_shortname" : "kslider",
							"parameter_longname" : "kslider"
						}

					}
,
					"varname" : "kslider"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-24",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 958.804688, 1073.661987, 79.0, 20.0 ],
					"text" : "loadmess 10"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-68",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1141.627197, 1768.727783, 72.0, 20.0 ],
					"text" : "loadmess 1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-67",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 996.303833, 1768.727783, 72.0, 20.0 ],
					"text" : "loadmess 1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-66",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 863.805542, 1768.727783, 72.0, 20.0 ],
					"text" : "loadmess 1"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.058552, 0.058563, 0.058549, 1.0 ],
					"bordercolor" : [ 0.113725, 0.113725, 0.121569, 1.0 ],
					"candicane2" : [ 0.073939, 0.097567, 0.106429, 1.0 ],
					"candicane3" : [ 0.85098, 0.796078, 0.619608, 1.0 ],
					"candycane" : 3,
					"id" : "obj-64",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 81.345886, 914.550415, 373.0, 120.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 22.180176, 289.773956, 692.275391, 61.436005 ],
					"setminmax" : [ 0.0, 1.0 ],
					"setstyle" : 5,
					"slidercolor" : [ 0.47, 0.77, 0.83, 0.504 ],
					"varname" : "multislider[1]"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-404",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 109.829041, 813.546265, 99.0, 20.0 ],
					"text" : "scale 0. 1. 0. 0.7"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-180",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 109.829041, 845.546265, 162.0, 18.0 ],
					"text" : "slidercolor 0.47 0.77 0.83 $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-65",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 81.345886, 763.546509, 83.0, 20.0 ],
					"text" : "snapshot~ 10"
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-179",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 22.180176, 76.810837, 170.0, 90.801437 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-23",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 33.345879, 280.225769, 115.0, 20.0 ],
					"text" : "metro 4n @active 1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-11",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1141.627197, 1844.093018, 103.0, 18.0 ],
					"text" : "release_curve $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-6",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 996.303833, 1844.093018, 95.0, 18.0 ],
					"text" : "decay_curve $1"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"border" : 1.75,
					"bordercolor" : [ 0.501961, 0.501961, 0.501961, 0.0 ],
					"id" : "obj-7",
					"local" : 1,
					"maxclass" : "ezdac~",
					"numinlets" : 2,
					"numoutlets" : 0,
					"ongradcolor1" : [ 1.0, 1.0, 1.0, 1.0 ],
					"patching_rect" : [ 3530.666748, 2748.603027, 44.0, 44.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1162.223145, 452.947144, 33.0, 33.0 ],
					"prototypename" : "helpfile"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-16",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 2757.952148, 2013.569336, 75.0, 20.0 ],
					"text" : "freq (phase)"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-14",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "signal", "bang" ],
					"patching_rect" : [ 4037.51416, 2350.230469, 47.0, 20.0 ],
					"text" : "line~ 7"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-15",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 4037.51416, 2320.230469, 59.0, 20.0 ],
					"text" : "pack f 10"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-13",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "signal", "bang" ],
					"patching_rect" : [ 3338.666748, 2013.569336, 46.0, 20.0 ],
					"text" : "line~ 1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-12",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 3338.666748, 1983.569336, 67.0, 20.0 ],
					"text" : "pack f 200"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-28",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 2739.452148, 2158.513428, 50.0, 20.0 ],
					"varname" : "flonum"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-26",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 2739.452148, 2188.513428, 66.0, 20.0 ],
					"text" : "phasor~ 2"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"bordercolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"curvecolor" : [ 0.364409, 0.890907, 0.948841, 1.0 ],
					"fgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-20",
					"maxclass" : "spectroscope~",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 3616.021973, 2592.122314, 345.0, 135.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 743.180176, 267.647919, 170.0, 84.0 ],
					"sonomonobgcolor" : [ 0.0, 0.0, 0.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 48.0,
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 4,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 6,
							"minor" : 0,
							"revision" : 4
						}
,
						"rect" : [ 703.0, 219.0, 541.0, 620.0 ],
						"bgcolor" : [ 0.9, 0.9, 0.9, 1.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 0,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 0,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"boxanimatetime" : 200,
						"imprint" : 0,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"boxes" : [ 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-12",
									"linecount" : 5,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 180.0, 285.0, 95.0, 75.0 ],
									"text" : "Mixing the nearest partials above/below to preserve phase coherency"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-8",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 360.0, 285.0, 90.0, 20.0 ],
									"text" : "The envelope"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-7",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 165.0, 255.0, 35.0, 20.0 ],
									"text" : "fract"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-6",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 120.0, 255.0, 34.0, 20.0 ],
									"text" : "floor"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-5",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 120.0, 211.0, 123.0, 20.0 ],
									"text" : "in 3 @comment shift"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-26",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 75.0, 75.0, 134.0, 20.0 ],
									"text" : "in 2 @comment phase"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-24",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 75.0, 450.0, 32.5, 20.0 ],
									"text" : "*"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-23",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 315.0, 390.0, 30.0, 20.0 ],
									"text" : "exp"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-22",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 345.0, 330.0, 157.0, 20.0 ],
									"text" : "in 4 @comment bandwidth"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-21",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 315.0, 360.0, 32.5, 20.0 ],
									"text" : "*"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-20",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 315.0, 330.0, 25.0, 20.0 ],
									"text" : "- 1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-19",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 315.0, 300.0, 30.0, 20.0 ],
									"text" : "cos"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-17",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 135.0, 285.0, 28.0, 20.0 ],
									"text" : "+ 1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-15",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 120.0, 315.0, 32.5, 20.0 ],
									"text" : "*"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-3",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 75.0, 315.0, 32.5, 20.0 ],
									"text" : "*"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-16",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 105.0, 135.0, 150.0, 20.0 ],
									"text" : "The ModFM operator"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-14",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 45.0, 510.0, 32.5, 20.0 ],
									"text" : "*"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-11",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 75.0, 390.0, 46.0, 20.0 ],
									"text" : "mix"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-10",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 120.0, 345.0, 30.0, 20.0 ],
									"text" : "cos"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-9",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 75.0, 345.0, 30.0, 20.0 ],
									"text" : "cos"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-1",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 45.0, 30.0, 154.0, 20.0 ],
									"text" : "in 1 @comment amplitude"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-2",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 75.0, 165.0, 81.0, 20.0 ],
									"text" : "expr in1*pi*2"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-4",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 555.0, 38.0, 20.0 ],
									"text" : "out 1"
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-14", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-1", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-11", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-10", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-24", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-11", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-4", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-14", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-10", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-15", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-15", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-17", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-20", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-19", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-15", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-2", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-19", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 84.5, 200.0, 324.5, 200.0 ],
									"source" : [ "obj-2", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-3", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-2", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-21", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-20", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-23", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-21", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-21", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-22", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-24", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-23", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-14", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-24", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-2", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-26", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-9", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-3", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-6", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-5", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-5", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-17", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-6", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-3", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-6", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-11", 2 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 174.5, 383.5, 111.5, 383.5 ],
									"source" : [ "obj-7", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-11", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-9", 0 ]
								}

							}
 ],
						"dependency_cache" : [ 							{
								"name" : "expr.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "mix.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "*.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "+.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "-.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "exp.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "floor.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "fract.mxo",
								"type" : "iLaX"
							}
 ]
					}
,
					"patching_rect" : [ 3575.463379, 2481.638916, 481.050781, 62.0 ],
					"text" : "gen~"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"frgb" : [ 0.270861, 0.683223, 0.758605, 1.0 ],
					"id" : "obj-318",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 771.411255, 1844.093018, 40.0, 20.0 ],
					"text" : "curve",
					"textcolor" : [ 0.270861, 0.683223, 0.758605, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-319",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 883.304688, 1308.189941, 89.0, 18.0 ],
					"text" : "attack_time $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-219",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 33.345879, 484.57019, 32.5, 18.0 ],
					"text" : "1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-220",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 76.345886, 484.57019, 32.5, 18.0 ],
					"text" : "0"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-49",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 76.345886, 451.57019, 132.0, 20.0 ],
					"text" : "delay 50"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-224",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 33.345879, 357.570251, 49.0, 49.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-237",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 863.805542, 1844.093018, 95.0, 18.0 ],
					"text" : "attack_curve $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 33.345879, 545.57019, 20.0, 20.0 ],
					"varname" : "toggle"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-246",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 33.345879, 585.57019, 35.0, 20.0 ],
					"text" : "sig~"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 48.0,
					"id" : "obj-248",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 6,
							"minor" : 0,
							"revision" : 4
						}
,
						"rect" : [ 318.0, 78.0, 1145.0, 1040.0 ],
						"bgcolor" : [ 0.9, 0.9, 0.9, 1.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 0,
						"gridsize" : [ 5.0, 5.0 ],
						"gridsnaponopen" : 0,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"boxanimatetime" : 200,
						"imprint" : 0,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"boxes" : [ 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-2",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 682.571411, 68.0, 390.0, 20.0 ],
									"text" : "ADSR modified from Gregory Taylor's seven segment awesomeness"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-1",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 935.785645, 779.0, 21.857178, 20.0 ],
									"text" : "1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-34",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 914.142883, 563.0, 137.0, 20.0 ],
									"text" : "param sustain_level 0.5"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-76",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 507.0, 135.0, 113.0, 20.0 ],
									"text" : "param vel_curve 1."
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-75",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 476.222229, 135.0, 19.0, 20.0 ],
									"text" : "1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-74",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 445.0, 135.0, 31.0, 20.0 ],
									"text" : "!- 1."
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-73",
									"maxclass" : "newobj",
									"numinlets" : 4,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 414.666656, 162.5, 111.333344, 20.0 ],
									"text" : "scale 0. 1."
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-72",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 445.0, 92.0, 42.0, 20.0 ],
									"text" : "* 0.01"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-70",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 445.0, 68.0, 69.0, 20.0 ],
									"text" : "clip 0. 100."
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-24",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 445.0, 30.0, 129.0, 20.0 ],
									"text" : "param vel_sense 100."
								}

							}
, 							{
								"box" : 								{
									"bubble" : 1,
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-71",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 617.5, 935.0, 106.0, 24.0 ],
									"text" : "Scale by value"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-69",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 89.0, 246.5, 50.0, 20.0 ],
									"text" : "sah 0.5"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-68",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 585.0, 935.0, 32.5, 20.0 ],
									"text" : "*"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-4",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 631.928589, 347.0, 21.0, 20.0 ],
									"text" : "-1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-44",
									"linecount" : 3,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 682.571411, 135.0, 390.0, 48.0 ],
									"text" : "I am indebted to Graham Wakefield and Peter McCullogh \n(i migliori fabbri) for their advice and suggestions, and to Graham for the creation of the selector operator that makes this so much easier...."
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-64",
									"linecount" : 4,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 146.0, 848.0, 161.0, 62.0 ],
									"text" : "Since this is gen~land, the envelope generator is never really \"off\" - it is\nmerely outputting 0 values"
								}

							}
, 							{
								"box" : 								{
									"bubble" : 1,
									"bubblepoint" : 0.2,
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-62",
									"linecount" : 2,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 548.5, 594.0, 138.0, 38.0 ],
									"text" : "Increment the count by one tick's value"
								}

							}
, 							{
								"box" : 								{
									"bubble" : 1,
									"bubblepoint" : 0.2,
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-61",
									"linecount" : 2,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 209.0, 280.0, 182.0, 39.0 ],
									"text" : "If this is a note-on, jump to\nsegment 1 (or retrigger)"
								}

							}
, 							{
								"box" : 								{
									"bubble" : 1,
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-60",
									"linecount" : 2,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 311.0, 226.5, 128.0, 38.0 ],
									"text" : "jump to segment 4 if this is a note-off"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-57",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 986.428467, 779.0, 133.0, 20.0 ],
									"text" : "param release_curve 1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-37",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 885.142822, 746.0, 126.0, 20.0 ],
									"text" : "param decay_curve 1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-42",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 834.5, 716.0, 126.0, 20.0 ],
									"text" : "param attack_curve 1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-49",
									"maxclass" : "newobj",
									"numinlets" : 5,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 783.857117, 819.0, 221.571411, 20.0 ],
									"text" : "selector 4"
								}

							}
, 							{
								"box" : 								{
									"bubble" : 1,
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-32",
									"linecount" : 3,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 567.0, 446.0, 228.0, 52.0 ],
									"text" : "computes the amount to increment the ramp's count for each tick, based on the current sample rate"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-31",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 480.0, 446.0, 80.0, 20.0 ],
									"text" : "* samplerate"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-30",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 480.0, 417.0, 50.0, 20.0 ],
									"text" : "* 0.001"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-28",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 480.0, 472.0, 28.0, 20.0 ],
									"text" : "!/ 1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-21",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 682.571411, 347.0, 140.0, 20.0 ],
									"text" : "param release_time 250"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-67",
									"linecount" : 2,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 202.0, 651.0, 62.0, 34.0 ],
									"text" : "envelope phase"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-59",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 480.0, 354.0, 49.0, 20.0 ],
									"text" : "clip 1 4"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-39",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 581.285706, 327.0, 133.0, 20.0 ],
									"text" : "param decay_time 300"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-35",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 530.642822, 299.0, 139.0, 20.0 ],
									"text" : "param attack_time 1000"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-36",
									"maxclass" : "newobj",
									"numinlets" : 5,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 480.0, 384.0, 221.571411, 20.0 ],
									"text" : "selector 4"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-29",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 1015.428528, 594.0, 19.0, 20.0 ],
									"text" : "0"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-25",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 863.5, 594.0, 19.0, 20.0 ],
									"text" : "1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-23",
									"maxclass" : "newobj",
									"numinlets" : 5,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 812.857117, 630.0, 221.571533, 20.0 ],
									"text" : "selector 4"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-22",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 736.700012, 686.0, 30.0, 20.0 ],
									"text" : "abs"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-19",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 661.200012, 686.0, 74.0, 20.0 ],
									"text" : "history prev"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-18",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 661.200012, 716.0, 94.5, 20.0 ],
									"text" : "sah 0.5"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-17",
									"maxclass" : "newobj",
									"numinlets" : 6,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 585.0, 869.0, 146.0, 20.0 ],
									"text" : "scale"
								}

							}
, 							{
								"box" : 								{
									"bubble" : 1,
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-16",
									"linecount" : 4,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 202.0, 700.0, 142.0, 66.0 ],
									"text" : "If it's the end of a ramp, then send the number of the next segment to output"
								}

							}
, 							{
								"box" : 								{
									"bubble" : 1,
									"bubblepoint" : 0.2,
									"bubbleside" : 3,
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-15",
									"linecount" : 6,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 541.0, 686.0, 111.928589, 94.0 ],
									"text" : "This history\nkeeps track\nof the current\nramp value so\nthat transitions\nare smooth"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-14",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 146.0, 783.0, 49.0, 20.0 ],
									"text" : "clip 0 4"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-12",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 529.5, 541.0, 37.0, 20.0 ],
									"text" : "delta"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-11",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 585.0, 813.0, 50.0, 20.0 ],
									"text" : "clip 0 1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-10",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 585.0, 966.0, 38.0, 20.0 ],
									"text" : "out 1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-6",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 161.5, 723.0, 35.0, 20.0 ],
									"text" : ">= 1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-5",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 480.0, 584.0, 68.5, 20.0 ],
									"text" : "+="
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-7",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 146.0, 813.0, 108.0, 20.0 ],
									"text" : "history segment 8"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-58",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 146.0, 753.0, 34.5, 20.0 ],
									"text" : "+"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-55",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 263.5, 205.5, 24.0, 20.0 ],
									"text" : "f 4"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-56",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 243.0, 235.5, 60.0, 20.0 ],
									"text" : "?"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-54",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 166.5, 250.0, 24.0, 20.0 ],
									"text" : "f 1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-53",
									"maxclass" : "newobj",
									"numinlets" : 3,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 146.0, 280.0, 60.0, 20.0 ],
									"text" : "?"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-51",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 256.5, 134.0, 60.0, 20.0 ],
									"text" : "note off"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-52",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 243.0, 154.0, 39.0, 20.0 ],
									"text" : "== -1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-50",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 161.0, 134.0, 60.0, 20.0 ],
									"text" : "note on"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-48",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 146.0, 154.0, 35.0, 20.0 ],
									"text" : "== 1"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-47",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 146.0, 92.0, 37.0, 20.0 ],
									"text" : "delta"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-46",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 146.0, 62.0, 31.0, 20.0 ],
									"text" : "!= 0"
								}

							}
, 							{
								"box" : 								{
									"fontname" : "Arial",
									"fontsize" : 12.0,
									"id" : "obj-45",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 146.0, 13.0, 136.0, 20.0 ],
									"text" : "in 1 @comment trigger"
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-49", 3 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-1", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-17", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-11", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-22", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 539.0, 575.0, 746.200012, 575.0 ],
									"source" : [ "obj-12", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-5", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-12", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-14", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-19", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 594.5, 901.0, 522.5, 901.0, 522.5, 675.0, 670.700012, 675.0 ],
									"source" : [ "obj-17", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-68", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-17", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-17", 3 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-18", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-18", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-19", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-36", 4 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-21", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-18", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-22", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-17", 4 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 822.357117, 757.0, 696.099976, 757.0 ],
									"source" : [ "obj-23", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-70", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-24", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-23", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-25", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-5", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-28", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-23", 4 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-29", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-31", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-30", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-28", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-31", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-23", 3 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-34", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-23", 2 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-34", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-36", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-35", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-30", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-36", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-49", 2 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-37", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-36", 2 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-39", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-36", 3 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-49", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-42", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-46", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-45", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-73", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 155.5, 48.25, 424.166656, 48.25 ],
									"source" : [ "obj-45", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-47", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-46", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-48", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-47", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-52", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 155.5, 123.0, 252.5, 123.0 ],
									"source" : [ "obj-47", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-53", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-48", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-69", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 155.5, 224.75, 129.5, 224.75 ],
									"source" : [ "obj-48", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-17", 5 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 793.357117, 853.5, 721.5, 853.5 ],
									"source" : [ "obj-49", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-11", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 489.5, 799.0, 594.5, 799.0 ],
									"source" : [ "obj-5", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-6", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 489.5, 628.0, 171.0, 628.0 ],
									"source" : [ "obj-5", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-56", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-52", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"color" : [ 0.12549, 0.686275, 0.0, 1.0 ],
									"destination" : [ "obj-12", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 155.5, 528.5, 539.0, 528.5 ],
									"source" : [ "obj-53", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"color" : [ 0.12549, 0.686275, 0.0, 1.0 ],
									"destination" : [ "obj-23", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 155.5, 528.0, 822.357117, 528.0 ],
									"source" : [ "obj-53", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"color" : [ 0.12549, 0.686275, 0.0, 1.0 ],
									"destination" : [ "obj-49", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 155.5, 529.5, 793.357117, 529.5 ],
									"source" : [ "obj-53", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"color" : [ 0.12549, 0.686275, 0.0, 1.0 ],
									"destination" : [ "obj-58", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-53", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"color" : [ 0.12549, 0.686275, 0.0, 1.0 ],
									"destination" : [ "obj-59", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 155.5, 341.5, 489.5, 341.5 ],
									"source" : [ "obj-53", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-53", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-54", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-56", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-55", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-53", 2 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 252.5, 263.75, 196.5, 263.75 ],
									"source" : [ "obj-56", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-49", 4 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-57", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-14", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-58", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-36", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-59", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-58", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-6", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-10", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-68", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-68", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 98.5, 922.25, 608.0, 922.25 ],
									"source" : [ "obj-69", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-56", 2 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 155.5, 842.0, 448.5, 842.0, 448.5, 211.5, 293.5, 211.5 ],
									"source" : [ "obj-7", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-72", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-70", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-74", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-72", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-69", 0 ],
									"disabled" : 0,
									"hidden" : 0,
									"midpoints" : [ 424.166656, 196.0, 98.5, 196.0 ],
									"source" : [ "obj-73", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-73", 1 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-74", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-73", 2 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-75", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-73", 3 ],
									"disabled" : 0,
									"hidden" : 0,
									"source" : [ "obj-76", 0 ]
								}

							}
 ],
						"dependency_cache" : [ 							{
								"name" : "!=.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "delta.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "==.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "?.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "f.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "+.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "history.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "+=.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : ">=.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "sah.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "abs.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "selector.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "int.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "param.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "!/.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "*.mxo",
								"type" : "iLaX"
							}
, 							{
								"name" : "!-.mxo",
								"type" : "iLaX"
							}
 ]
					}
,
					"patching_rect" : [ 33.345879, 655.694214, 124.0, 62.0 ],
					"text" : "gen~"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.101147, 0.154065, 0.160221, 1.0 ],
					"bordercolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"grad1" : [ 0.112724, 0.186118, 0.192373, 1.0 ],
					"grad2" : [ 0.101147, 0.154065, 0.160221, 1.0 ],
					"id" : "obj-38",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 755.110718, 1748.025879, 527.201477, 143.636597 ],
					"rounded" : 0
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-273",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.187134, 76.810837, 170.0, 90.801437 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-275",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 370.44873, 76.810837, 170.0, 90.801437 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-276",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 544.455566, 76.810837, 170.0, 90.801437 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-286",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 22.180176, 171.810822, 170.0, 46.996582 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-287",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.187134, 171.810822, 170.0, 46.996582 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-289",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 370.44873, 171.810822, 170.0, 46.996582 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-301",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 544.455566, 171.810822, 170.0, 46.996582 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-308",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 22.180176, 220.417847, 170.0, 62.875275 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-310",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.187134, 220.417847, 170.0, 62.875275 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-312",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 370.44873, 220.417847, 170.0, 62.875275 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-313",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 544.455566, 220.417847, 170.0, 62.875275 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.101147, 0.154065, 0.160221, 1.0 ],
					"bordercolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"grad1" : [ 0.112724, 0.186118, 0.192373, 1.0 ],
					"grad2" : [ 0.101147, 0.154065, 0.160221, 1.0 ],
					"id" : "obj-81",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 642.068848, 872.944214, 1962.077515, 588.594543 ],
					"presentation" : 1,
					"presentation_rect" : [ 11.93689, 65.908264, 710.253235, 298.739655 ],
					"rounded" : 0
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-327",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 743.180176, 172.649628, 170.0, 46.996582 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-331",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 917.187134, 224.340118, 170.0, 35.827942 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-332",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 917.187134, 76.28595, 170.0, 90.801437 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-333",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 917.187134, 172.649628, 170.0, 46.996582 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-349",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1096.850342, 224.340118, 170.0, 35.827942 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-350",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1096.850342, 76.28595, 170.0, 90.801437 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-351",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1096.850342, 172.649628, 170.0, 46.996582 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.101147, 0.154065, 0.160221, 1.0 ],
					"bordercolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"grad1" : [ 0.112724, 0.186118, 0.192373, 1.0 ],
					"grad2" : [ 0.101147, 0.154065, 0.160221, 1.0 ],
					"id" : "obj-2",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 113.15976, 153.105835 ],
					"presentation" : 1,
					"presentation_rect" : [ 11.93689, 370.947113, 1271.458496, 130.856964 ],
					"rounded" : 0
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-196",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 1516.049561, 190.0, 82.00293 ],
					"presentation" : 1,
					"presentation_rect" : [ 1012.721924, 267.647919, 257.933838, 84.0 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -90.0,
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad1" : [ 0.0, 0.0, 0.0, 1.0 ],
					"grad2" : [ 0.128926, 0.129142, 0.14239, 1.0 ],
					"id" : "obj-30",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4828.943359, 1516.049561, 190.0, 82.00293 ],
					"presentation" : 1,
					"presentation_rect" : [ 917.187134, 267.647919, 90.58725, 84.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.101147, 0.154065, 0.160221, 1.0 ],
					"bordercolor" : [ 0.0, 0.0, 0.0, 0.0 ],
					"grad1" : [ 0.112724, 0.186118, 0.192373, 1.0 ],
					"grad2" : [ 0.101147, 0.154065, 0.160221, 1.0 ],
					"id" : "obj-320",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 58.192276, 213.383728 ],
					"presentation" : 1,
					"presentation_rect" : [ 732.93689, 65.908264, 550.458435, 298.739655 ],
					"rounded" : 0
				}

			}
, 			{
				"box" : 				{
					"background" : 1,
					"bgcolor" : [ 0.322067, 0.322128, 0.322051, 1.0 ],
					"grad1" : [ 0.322067, 0.322128, 0.322051, 1.0 ],
					"id" : "obj-8",
					"ignoreclick" : 1,
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 4616.266113, 2266.230469, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ -3.0, -1.150314, 1407.397461, 639.193909 ],
					"rounded" : 0
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-32", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-125", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-104", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-104", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-323", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-107", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-127", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 463.62439, 2734.245117, 412.551422, 2734.245117 ],
					"source" : [ "obj-117", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-123", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 205.772491, 2734.245117, 205.772491, 2734.245117 ],
					"source" : [ "obj-118", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-124", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-127", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 412.551422, 2734.245117, 412.551422, 2734.245117 ],
					"source" : [ "obj-128", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-123", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 256.845245, 2734.245117, 205.772491, 2734.245117 ],
					"source" : [ "obj-129", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 2 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 3348.166748, 2257.104004, 3892.997314, 2257.104004 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-135", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-132", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-136", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-132", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-158", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-132", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-178", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-132", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-132", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-133", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-123", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 358.990875, 2734.245117, 205.772491, 2734.245117 ],
					"source" : [ "obj-134", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-177", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 982.769897, 2734.245117, 829.551636, 2734.245117 ],
					"source" : [ "obj-135", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-177", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 931.697144, 2734.245117, 829.551636, 2734.245117 ],
					"source" : [ "obj-136", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-123", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 307.917999, 2734.245117, 205.772491, 2734.245117 ],
					"source" : [ "obj-137", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 3 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-177", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 880.62439, 2734.245117, 829.551636, 2734.245117 ],
					"source" : [ "obj-158", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-367", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-177", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 829.551636, 2734.245117, 829.551636, 2734.245117 ],
					"source" : [ "obj-178", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-180", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-183", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-181", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-184", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-181", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-185", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-181", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-187", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-181", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-181", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-182", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-186", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 775.990845, 2734.245117, 622.772339, 2734.245117 ],
					"source" : [ "obj-183", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-186", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 724.917847, 2734.245117, 622.772339, 2734.245117 ],
					"source" : [ "obj-184", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-186", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 673.845093, 2734.245117, 622.772339, 2734.245117 ],
					"source" : [ "obj-185", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-186", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 622.772339, 2734.245117, 622.772339, 2734.245117 ],
					"source" : [ "obj-187", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-190", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-188", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-215", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-188", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-216", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-188", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-222", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-188", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-188", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-189", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-107", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-217", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1402.769897, 2734.245117, 1249.551636, 2734.245117 ],
					"source" : [ "obj-190", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-217", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1351.697144, 2734.245117, 1249.551636, 2734.245117 ],
					"source" : [ "obj-215", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-217", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1300.62439, 2734.245117, 1249.551636, 2734.245117 ],
					"source" : [ "obj-216", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 42.845879, 523.57019, 42.845879, 523.57019 ],
					"source" : [ "obj-219", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 85.845886, 523.57019, 42.845879, 523.57019 ],
					"source" : [ "obj-220", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-217", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1249.551636, 2734.245117, 1249.551636, 2734.245117 ],
					"source" : [ "obj-222", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-226", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-223", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-227", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-223", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-228", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-223", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-231", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-223", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-219", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-224", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-224", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-223", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-225", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-229", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1195.990845, 2734.245117, 1042.772339, 2734.245117 ],
					"source" : [ "obj-226", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-229", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1144.917847, 2734.245117, 1042.772339, 2734.245117 ],
					"source" : [ "obj-227", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-229", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1093.845093, 2734.245117, 1042.772339, 2734.245117 ],
					"source" : [ "obj-228", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-224", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-23", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-319", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-230", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-229", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1042.772339, 2734.245117, 1042.772339, 2734.245117 ],
					"source" : [ "obj-231", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-235", 4 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-234", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-242", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-235", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-237", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-236", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-237", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-230", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-238", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-233", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-239", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-235", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-239", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-356", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-24", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-264", 4 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-240", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-238", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-242", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-271", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-243", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-252", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-244", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-248", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-246", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 42.845879, 2414.982178, 3584.963379, 2414.982178 ],
					"source" : [ "obj-248", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-65", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-248", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-251", 4 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-249", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-244", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-251", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-259", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-252", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-247", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-253", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-251", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-253", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-258", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-254", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-255", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-244", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-258", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-255", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-259", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 2748.952148, 2344.576172, 3738.980225, 2344.576172 ],
					"source" : [ "obj-26", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-265", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-260", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-260", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-264", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-243", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-265", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-262", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-266", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-264", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-266", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-270", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-267", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-268", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-260", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-270", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-272", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-271", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-268", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-272", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-28", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-293", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-288", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-248", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-292", 4 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-291", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-288", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-292", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-299", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-293", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-290", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-294", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-292", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-294", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-298", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-295", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-296", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-288", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-298", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-296", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-299", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-304", 4 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-303", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-305", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-304", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-330", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-305", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-302", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-306", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-304", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-306", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-107", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-317", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-319", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-118", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-32", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-129", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-32", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-134", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-32", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-137", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-32", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-323", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-305", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-329", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-117", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-33", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-128", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-33", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-33", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-41", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-33", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-330", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-340", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-336", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-339", 4 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-338", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-340", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-339", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-33", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-358", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-340", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-337", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-341", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-339", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-341", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-344", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-342", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-345", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-342", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-346", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-342", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-348", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-342", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-342", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-343", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-347", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1632.633667, 2734.245117, 1479.415405, 2734.245117 ],
					"source" : [ "obj-344", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-347", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1581.560913, 2734.245117, 1479.415405, 2734.245117 ],
					"source" : [ "obj-345", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-347", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1530.488159, 2734.245117, 1479.415405, 2734.245117 ],
					"source" : [ "obj-346", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-347", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1479.415405, 2734.245117, 1479.415405, 2734.245117 ],
					"source" : [ "obj-348", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-28", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-35", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-242", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-356", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-358", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 4 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-360", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-362", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 2 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-363", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 3 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-364", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-127", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 565.769897, 2734.245117, 412.551422, 2734.245117 ],
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-20", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-180", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-404", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-127", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 514.697144, 2734.245117, 412.551422, 2734.245117 ],
					"source" : [ "obj-41", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-454", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-42", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-104", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 2344.740967, 23.69733, 198.84613, 23.69733 ],
					"source" : [ "obj-44", 4 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-239", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1749.400757, 566.289551, 892.804688, 566.289551 ],
					"source" : [ "obj-44", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-253", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 1898.23584, 642.289551, 1364.924316, 642.289551 ],
					"source" : [ "obj-44", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-266", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 2047.070801, 802.289551, 1879.170166, 802.289551 ],
					"source" : [ "obj-44", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-294", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 2195.905762, 802.289551, 2369.422119, 802.289551 ],
					"source" : [ "obj-44", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-306", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 2493.575928, 825.348511, 3348.166748, 825.348511 ],
					"source" : [ "obj-44", 5 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-341", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 2642.410889, 644.354858, 4047.01416, 644.354858 ],
					"source" : [ "obj-44", 6 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-457", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-45", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-460", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-457", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-459", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-454", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-460", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-47", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-50", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-48", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-220", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-49", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-494", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-50", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-51", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-62", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-52", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 1 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-530", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-62", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-404", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-65", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-64", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-65", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-236", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-66", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-459", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-67", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-494", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"source" : [ "obj-68", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-246", 0 ],
					"disabled" : 0,
					"hidden" : 0,
					"midpoints" : [ 42.845879, 575.07019, 42.845879, 575.07019 ],
					"source" : [ "obj-9", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-362::obj-73" : [ "Freq", "Freq", 0 ],
			"obj-364::obj-61" : [ "Run[3]", "Run", 2 ],
			"obj-364::obj-70" : [ "TimeMode[3]", "TimeMode", 1 ],
			"obj-363::obj-61" : [ "Run[2]", "Run", 2 ],
			"obj-360::obj-59" : [ "SyncNum[1]", "SyncNum", 0 ],
			"obj-530" : [ "step.duration[3]", "step.duration", 0 ],
			"obj-362::obj-74" : [ "Waveform", "Waveform", 0 ],
			"obj-42" : [ "live.toggle", "live.toggle", 0 ],
			"obj-364::obj-59" : [ "SyncNum[3]", "SyncNum", 0 ],
			"obj-363::obj-59" : [ "SyncNum[2]", "SyncNum", 0 ],
			"obj-362::obj-59" : [ "SyncNum", "SyncNum", 0 ],
			"obj-360::obj-71" : [ "SyncBase[1]", "SyncBase", 0 ],
			"obj-362::obj-61" : [ "Run", "Run", 2 ],
			"obj-364::obj-74" : [ "Waveform[3]", "Waveform", 0 ],
			"obj-1" : [ "live.gain~", "live.gain~", 0 ],
			"obj-363::obj-70" : [ "TimeMode[2]", "TimeMode", 1 ],
			"obj-360::obj-61" : [ "Run[1]", "Run", 2 ],
			"obj-364::obj-73" : [ "Freq[3]", "Freq", 0 ],
			"obj-363::obj-73" : [ "Freq[2]", "Freq", 0 ],
			"obj-360::obj-74" : [ "Waveform[1]", "Waveform", 0 ],
			"obj-360::obj-70" : [ "TimeMode[1]", "TimeMode", 1 ],
			"obj-362::obj-70" : [ "TimeMode", "TimeMode", 1 ],
			"obj-362::obj-71" : [ "SyncBase", "SyncBase", 0 ],
			"obj-364::obj-71" : [ "SyncBase[3]", "SyncBase", 0 ],
			"obj-363::obj-74" : [ "Waveform[2]", "Waveform", 0 ],
			"obj-363::obj-71" : [ "SyncBase[2]", "SyncBase", 0 ],
			"obj-360::obj-73" : [ "Freq[1]", "Freq", 0 ],
			"obj-62" : [ "kslider", "kslider", 0 ]
		}
,
		"dependency_cache" : [ 			{
				"name" : "lfomgd.maxpat",
				"bootpath" : "/Users/mgd/Documents/Max Development/max development/Feb 2012 gen patch a day",
				"patcherrelativepath" : "",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "sine.svg",
				"bootpath" : "/Applications/Max6/patches/picts/m4l-picts",
				"patcherrelativepath" : "../../../../../../Applications/Max6/patches/picts/m4l-picts",
				"type" : "svg ",
				"implicit" : 1
			}
, 			{
				"name" : "up.svg",
				"bootpath" : "/Applications/Max6/patches/picts/m4l-picts",
				"patcherrelativepath" : "../../../../../../Applications/Max6/patches/picts/m4l-picts",
				"type" : "svg ",
				"implicit" : 1
			}
, 			{
				"name" : "down.svg",
				"bootpath" : "/Applications/Max6/patches/picts/m4l-picts",
				"patcherrelativepath" : "../../../../../../Applications/Max6/patches/picts/m4l-picts",
				"type" : "svg ",
				"implicit" : 1
			}
, 			{
				"name" : "updown.svg",
				"bootpath" : "/Applications/Max6/patches/picts/m4l-picts",
				"patcherrelativepath" : "../../../../../../Applications/Max6/patches/picts/m4l-picts",
				"type" : "svg ",
				"implicit" : 1
			}
, 			{
				"name" : "square.svg",
				"bootpath" : "/Applications/Max6/patches/picts/m4l-picts",
				"patcherrelativepath" : "../../../../../../Applications/Max6/patches/picts/m4l-picts",
				"type" : "svg ",
				"implicit" : 1
			}
, 			{
				"name" : "random.svg",
				"bootpath" : "/Applications/Max6/patches/picts/m4l-picts",
				"patcherrelativepath" : "../../../../../../Applications/Max6/patches/picts/m4l-picts",
				"type" : "svg ",
				"implicit" : 1
			}
 ]
	}

}
