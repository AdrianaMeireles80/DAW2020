<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <title>Arqueossítio</title>
                </head>
                <body>
                    <h2>Arqueossítio</h2>
                    <h3>Índice</h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>                            
                        </xsl:apply-templates>                        
                    </ol>
                    <xsl:apply-templates />
                </body>
            </html>            
        </xsl:result-document>        
    </xsl:template>
    
    <!-- Templates de Índice -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="{count(preceding-sibling::*)+1}"/>
            <a href="/arqs/{count(preceding-sibling::*)+1}">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Templates de Conteúdo -->   
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/arq{count(preceding-sibling::*)+1}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <p><b>Tipo: </b> <xsl:value-of select="TIPO/@ASSUNTO"/></p>
                    
                    <p><b>Identificação: </b> <xsl:value-of select="IDENTI"/></p> 
                    
                    <xsl:choose>
                        <xsl:when test="IMAGEM">                            
                          <img src="../{IMAGEM/@NOME}" alt="Imagem indisponível"/>
                        </xsl:when>
                    </xsl:choose>
                    
                    <p><b>Descrição: </b> <xsl:value-of select="DESCRI"/></p>
                    
                    <xsl:choose>
                        <xsl:when test="CRONO">
                            <p><b>Cronologia: </b> <xsl:value-of select="CRONO"/></p>                            
                        </xsl:when>
                    </xsl:choose>
                    
                    <p><b>Lugar: </b> <xsl:value-of select="LUGAR"/></p>
                    
                    <p><b>Freguesia: </b> <xsl:value-of select="FREGUE"/></p>
                    
                    <p><b>Concelho: </b> <xsl:value-of select="CONCEL"/></p>
                    
                    <xsl:choose>
                        <xsl:when test="CODADM">
                            <p><b>Código Administrativo: </b> <xsl:value-of select="CODADM"/></p>                            
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="LATITU">
                            <p><b>Latitude: </b> <xsl:value-of select="LATITU"/></p>                            
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="LONGIT">
                            <p><b>Longitude: </b> <xsl:value-of select="LONGIT"/></p>                            
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="ALTITU">
                            <p><b>Altitude: </b> <xsl:value-of select="ALTITU"/></p> 
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="ACESSO">
                            <p><b>Acesso: </b> <xsl:value-of select="ACESSO"/></p>  
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="QUADRO">
                            <p><b>Quadro: </b> <xsl:value-of select="QUADRO"/></p>
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="TRAARQ">
                            <p><b>Trabalhos no Arquiossítio: </b> <xsl:value-of select="TRAARQ"/></p> 
                        </xsl:when>
                    </xsl:choose>
                    
                    <p><b>Descrição do Arqueossítio: </b> <xsl:value-of select="DESARQ"/></p>
                    
                    <xsl:choose>
                        <xsl:when test="INTERP">
                            <p><b>Interpretação: </b> <xsl:value-of select="INTERP"/></p>
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="DEPOSI">
                            <p><b>Depósito: </b> <xsl:value-of select="DEPOSI"/></p>
                        </xsl:when>
                    </xsl:choose>
                    
                    <xsl:choose>
                        <xsl:when test="INTERE">
                            <p><b>Interesse: </b> <xsl:value-of select="INTERE"/></p> 
                        </xsl:when>
                    </xsl:choose>
                    
                    <p><b>Bibliografia: </b> <xsl:value-of select="BIBLIO"/></p>
                    
                    <p><b>Autor: </b> <xsl:value-of select="AUTOR"/></p>
                    
                    <p><b>Data: </b> <xsl:value-of select="DATA"/></p>    
                    
                    <address>
                        [<a href="*#{count(preceding-sibling::*)+1}">Voltar à página principal</a>]
                    </address>                    
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>    
</xsl:stylesheet>