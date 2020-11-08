<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method = "html" indent ="yes"/>
    
    <xsl:template match ="ARQELEM">
        <xsl:result-document href="dados/arqs{count(preceding-sibling::*)+1}.html">
            <xsl:processing-instruction name="html-stylesheet">type="text/xsl" href=arq2html.xsl"</xsl:processing-instruction>
            <xsl:copy-of select="."/>                
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>