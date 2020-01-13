#include "pxt.h"

namespace watchfont{

	int32_t alph1[]={
			14894,10209,20137,18107,28831,30386,15010,17020,
			10922,9902
	};
	int32_t kanji1[]={
			14389992,32447,64159,9531465,5471569,9796937,5635429,1375521,
			10143943,32799975,17809607,32603629,17810407,33177832,10144229,1118480
	};
  //%
  int32_t getNumber(int32_t n)
  {
	return number1[n];
  }
  //%
  int32_t getKanji(int32_t n)
  {
	return kanji1[n];
  }
  //%
  Buffer getFontData(int charCode) {
  	if(charCode < MICROBIT_FONT_ASCII_START || charCode > MICROBIT_FONT_ASCII_END){
    	return PXT_CREATE_BUFFER(NULL, 5);
  }
  MicroBitFont font = MicroBitFont::getSystemFont();
  	int offset = (charCode - MICROBIT_FONT_ASCII_START) * 5;

	return PXT_CREATE_BUFFER((uint8_t *)(font.characters + offset), 5);
  }
}
