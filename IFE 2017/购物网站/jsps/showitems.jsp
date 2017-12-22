<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" errorPage="" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.io.*" %>

<% 
   request.setCharacterEncoding("UTF-8"); 
   try{
     String var=request.getParameter("variety");
     Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
     String dbuser="";
     String dbpw="";
     String url="jdbc:odbc:ec";
     Connection conn=DriverManager.getConnection(url,dbuser,dbpw);
     Statement stmt=conn.createStatement();
     String sql="select * from items where itvar='"+var+"'";
     ResultSet rs=stmt.executeQuery(sql);
     while(rs.next()){
       response.getWriter().print(rs.getString(2) + "&" + rs.getString(3) + "&" + rs.getString(5) + "|");
     }
     rs.close();
     stmt.close();
     conn.close();

  }catch(Exception e){
    out.print("conn Error");
    out.println(e.getMessage());
  }
%>