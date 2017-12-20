<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page session="true" import="java.util.*"   %>
<%@ page import="java.sql.*" %>
<%@ page import="java.io.*" %>

<%
request.setCharacterEncoding("GBK");
String goods=request.getParameter("goods");
out.print(goods);
%>
